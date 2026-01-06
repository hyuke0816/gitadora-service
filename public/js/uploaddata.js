/**
 * GITADORA 공식 홈페이지 스킬 데이터 업로드 북마크릿 스크립트
 *
 * 사용 방법:
 * 1. 이 스크립트를 북마크릿으로 등록
 * 2. GITADORA 공식 홈페이지 스킬 페이지에서 실행
 * 3. 데이터가 자동으로 서버로 업로드됨
 */

(function () {
  "use strict";

  // 설정: 서버 URL (실제 배포 시 변경 필요)
  // 로컬 개발 (HTTPS): https://localhost:30001 (포트 확인 필요!)
  // 프로덕션: 실제 서버 도메인으로 변경 (예: https://your-domain.com)
  const API_BASE_URL = "https://localhost:30001"; // 로컬 개발 환경 (HTTPS)

  // 프로덕션 환경에서는 아래 주석을 해제하고 위의 localhost를 주석 처리하세요:
  // const API_BASE_URL = "https://gitadora.info";

  // 난이도 클래스명에서 난이도 추출
  function getDifficultyFromClass(className) {
    if (className.includes("diff_BASIC")) return "BASIC";
    if (className.includes("diff_ADVANCED")) return "ADVANCED";
    if (className.includes("diff_EXTREME")) return "EXTREME";
    if (className.includes("diff_MASTER")) return "MASTER";
    return null;
  }

  // 프로필 페이지에서 칭호와 이름 추출
  function extractProfileInfoFromDocument(doc) {
    try {
      // 칭호 추출 (div.profile_shogo_frame)
      const titleElement = doc.querySelector("div.profile_shogo_frame");
      const title = titleElement ? titleElement.textContent.trim() : null;

      // 이름 추출 (div.profile_name_frame)
      const nameElement = doc.querySelector("div.profile_name_frame");
      const name = nameElement ? nameElement.textContent.trim() : null;

      // GITADORA ID 추출 (div.common_frame_date)
      const idElement = doc.querySelector("div.common_frame_date");
      const gitadoraId = idElement ? idElement.textContent.trim() : null;

      return {
        title: title || null,
        name: name || null,
        gitadoraId: gitadoraId || null,
      };
    } catch (error) {
      console.warn("Failed to extract profile info:", error);
      return {
        title: null,
        name: null,
        gitadoraId: null,
      };
    }
  }

  // 특정 페이지에서 스킬 데이터 추출 (HTML 문서 객체 사용)
  function extractSkillDataFromDocument(doc, instrumentType, isHot) {
    const records = [];

    try {
      // 스킬 테이블 찾기 (class="skill_table_tb common_tb")
      // 첫 번째 테이블만 사용 (중복 테이블 방지)
      const table = doc.querySelector("table.skill_table_tb.common_tb");

      if (!table) {
        return [];
      }

      // 테이블 행 추출 (thead 제외)
      const rows = Array.from(table.querySelectorAll("tbody tr"));

      rows.forEach((row) => {
        try {
          // 곡명 추출 (td.music_cell > div.skill_box > div.title > a.text_link)
          const titleLink = row.querySelector("td.music_cell a.text_link");
          if (!titleLink) return;

          const songTitle = titleLink.textContent.trim();
          if (!songTitle) return;

          // 난이도 및 악기 파트 추출 (div.music_seq_box > div.seq_icon)
          const seqBox = row.querySelector("div.music_seq_box");
          if (!seqBox) return;

          const seqIcons = seqBox.querySelectorAll("div.seq_icon");
          let difficulty = null;

          seqIcons.forEach((icon) => {
            const className = icon.className;

            // 난이도 추출
            const diff = getDifficultyFromClass(className);
            if (diff) {
              difficulty = diff;
            }
          });

          if (!difficulty) {
            console.warn("난이도를 찾을 수 없습니다:", row);
            return;
          }

          // 악기 파트는 페이지 설정을 따름 (원복 요청 반영)
          const finalInstrumentType = instrumentType;

          // 스킬 점수 추출 (td.skill_cell)
          const skillCell = row.querySelector("td.skill_cell");
          if (!skillCell) return;

          const skillText = skillCell.textContent.trim();
          const skillMatch = skillText.match(/(\d+\.\d+)/);
          if (!skillMatch) return;

          const skillScore = parseFloat(skillMatch[1]);

          // 레벨 추출 (td.diff_cell)
          const diffCell = row.querySelector("td.diff_cell");
          let level = 0;
          if (diffCell) {
            const diffText = diffCell.textContent.trim();
            level = parseFloat(diffText);
          }

          // 달성률 추출 (td.achive_cell)
          const achiveCell = row.querySelector("td.achive_cell");
          if (!achiveCell) return;

          const achiveText = achiveCell.textContent.trim();
          const achiveMatch = achiveText.match(/(\d+\.\d+)%/);
          if (!achiveMatch) return;

          const achievement = parseFloat(achiveMatch[1]);

          const record = {
            songTitle: songTitle,
            instrumentType: finalInstrumentType,
            difficulty: difficulty,
            achievement: achievement,
            skillScore: skillScore,
            level: level,
            isHot: isHot,
          };

          // 데이터 형식 검증
          if (
            !record.songTitle ||
            typeof record.songTitle !== "string" ||
            !record.instrumentType ||
            !["GUITAR", "BASS", "DRUM", "OPEN"].includes(
              record.instrumentType
            ) ||
            !record.difficulty ||
            !["BASIC", "ADVANCED", "EXTREME", "MASTER"].includes(
              record.difficulty
            ) ||
            typeof record.achievement !== "number" ||
            typeof record.skillScore !== "number" ||
            typeof record.level !== "number" ||
            typeof record.isHot !== "boolean"
          ) {
            console.warn("잘못된 데이터 형식 발견:", record);
            return; // 잘못된 데이터는 건너뜀
          }

          records.push(record);
        } catch (error) {
          console.warn("Failed to parse row:", error, row);
        }
      });

      return records;
    } catch (error) {
      console.error("Failed to extract skill data from document:", error);
      return [];
    }
  }

  // 수집할 페이지 목록 가져오기 (기타 핫/아더, 드럼 핫/아더)
  function getPagesToCollect() {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    let path = window.location.pathname;

    // 경로 보정: .../playdata/skill.html 이 되도록
    if (path.includes("/playdata/")) {
      const parts = path.split("/playdata/");
      path = `${parts[0]}/playdata/skill.html`;
    } else {
      console.warn("playdata 경로를 찾을 수 없습니다. 현재 경로를 사용합니다.");
    }

    const fullUrl = `${baseUrl}${path}`;

    return [
      {
        key: "gf_hot",
        url: `${fullUrl}?gtype=gf&stype=1`,
        label: "기타 핫",
        instrumentType: "GUITAR",
        isHot: true,
      },
      {
        key: "gf_other",
        url: `${fullUrl}?gtype=gf&stype=0`,
        label: "기타 아더",
        instrumentType: "GUITAR",
        isHot: false,
      },
      {
        key: "dm_hot",
        url: `${fullUrl}?gtype=dm&stype=1`,
        label: "드럼 핫",
        instrumentType: "DRUM",
        isHot: true,
      },
      {
        key: "dm_other",
        url: `${fullUrl}?gtype=dm&stype=0`,
        label: "드럼 아더",
        instrumentType: "DRUM",
        isHot: false,
      },
    ];
  }

  // 여러 페이지에서 데이터 한번에 추출 (병렬 처리)
  async function collectAllSkillData() {
    const pages = getPagesToCollect();
    let collectedCount = 0;

    // 로딩 메시지 업데이트 함수
    const updateProgress = () => {
      const overlay = document.getElementById("gitadora-loading-overlay");
      if (overlay) {
        const message = overlay.querySelector("div").firstElementChild;
        if (message) {
          message.textContent = `데이터 수집 중...\n${collectedCount}/${pages.length} 페이지 완료`;
          message.style.whiteSpace = "pre-line";
        }
      }
    };

    updateProgress();

    const promises = pages.map(async (page) => {
      try {
        console.log(`Fetching ${page.label}...`);
        const response = await fetch(page.url);
        const buffer = await response.arrayBuffer();
        const decoder = new TextDecoder(document.characterSet || "Shift_JIS");
        const html = decoder.decode(buffer);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const records = extractSkillDataFromDocument(
          doc,
          page.instrumentType,
          page.isHot
        );
        console.log(`${page.label} 수집 완료: ${records.length}개`);
        collectedCount++;
        updateProgress();
        return records;
      } catch (error) {
        console.error(`Error fetching ${page.label}:`, error);
        return [];
      }
    });

    const results = await Promise.all(promises);
    const allRecords = results.flat();
    return allRecords;
  }

  // 로딩 오버레이 생성
  function createLoadingOverlay() {
    // 이미 존재하는 오버레이가 있으면 제거
    const existing = document.getElementById("gitadora-loading-overlay");
    if (existing) {
      existing.remove();
    }

    // 오버레이 컨테이너 생성
    const overlay = document.createElement("div");
    overlay.id = "gitadora-loading-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 999999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    `;

    // 로딩 컨텐츠 박스
    const contentBox = document.createElement("div");
    contentBox.style.cssText = `
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px 50px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      text-align: center;
      min-width: 300px;
    `;

    // 메시지 텍스트
    const message = document.createElement("div");
    message.textContent = "업데이트 중...";
    message.style.cssText = `
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 30px;
    `;

    // 로딩 스피너 컨테이너
    const spinnerContainer = document.createElement("div");
    spinnerContainer.style.cssText = `
      width: 50px;
      height: 50px;
      margin: 0 auto;
      position: relative;
    `;

    // 로딩 스피너 (회전하는 원)
    const spinner = document.createElement("div");
    spinner.style.cssText = `
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;

    // 애니메이션 키프레임 추가 (스타일 태그에)
    if (!document.getElementById("gitadora-loading-styles")) {
      const style = document.createElement("style");
      style.id = "gitadora-loading-styles";
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    spinnerContainer.appendChild(spinner);
    contentBox.appendChild(message);
    contentBox.appendChild(spinnerContainer);
    overlay.appendChild(contentBox);
    document.body.appendChild(overlay);

    return overlay;
  }

  // 로딩 오버레이 제거
  function removeLoadingOverlay() {
    const overlay = document.getElementById("gitadora-loading-overlay");
    if (overlay) {
      overlay.remove();
    }
  }

  // 프로필 페이지에서 정보 가져오기 (iframe 사용)
  async function fetchProfileInfo() {
    try {
      // 현재 URL에서 profile 페이지 URL 구성
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const profileUrl = `${baseUrl}/game/gfdm/gitadora_galaxywave_delta/p/playdata/profile.html`;

      // 현재 페이지에서 프로필 정보 추출 시도
      const currentProfileInfo = extractProfileInfoFromDocument(document);
      if (
        currentProfileInfo.gitadoraId || // 중요: Gitadora ID가 있으면 성공으로 간주
        (currentProfileInfo.title && currentProfileInfo.name)
      ) {
        console.log("현재 페이지에서 프로필 정보 추출:", currentProfileInfo);
        return currentProfileInfo;
      }

      // 현재 페이지에 없으면 profile 페이지로 이동해서 가져오기
      // iframe을 사용하여 CORS 문제 회피
      return new Promise((resolve) => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = profileUrl;
        iframe.onload = () => {
          try {
            const iframeDoc =
              iframe.contentDocument || iframe.contentWindow.document;
            const profileInfo = extractProfileInfoFromDocument(iframeDoc);
            document.body.removeChild(iframe);
            console.log("프로필 페이지에서 정보 추출:", profileInfo);
            resolve(profileInfo);
          } catch (error) {
            console.warn("iframe에서 프로필 정보 추출 실패:", error);
            document.body.removeChild(iframe);
            resolve({ title: null, name: null, gitadoraId: null });
          }
        };
        iframe.onerror = () => {
          console.warn("프로필 페이지 로드 실패");
          document.body.removeChild(iframe);
          resolve({ title: null, name: null, gitadoraId: null });
        };
        document.body.appendChild(iframe);

        // 타임아웃 설정 (5초)
        setTimeout(() => {
          if (iframe.parentNode) {
            document.body.removeChild(iframe);
            resolve({ title: null, name: null, gitadoraId: null });
          }
        }, 5000);
      });
    } catch (error) {
      console.warn("프로필 정보 가져오기 실패:", error);
      return { title: null, name: null, gitadoraId: null };
    }
  }

  // 서버로 데이터 업로드 (Gitadora ID 기반)
  async function uploadSkillData(records, profileInfo) {
    try {
      const payload = {
        records,
        profileInfo, // Gitadora ID 포함
      };

      console.log("업로드 요청:", {
        url: `${API_BASE_URL}/api/skill-records`,
        recordCount: records.length,
        profileInfo: profileInfo,
      });

      const response = await fetch(`${API_BASE_URL}/api/skill-records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include" 제거 (쿠키 인증 불필요)
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        console.error("업로드 실패 응답:", error);

        let errorMessage = error.message || "업로드 실패";

        // 에러 상세 정보 출력
        if (error.errors && Array.isArray(error.errors)) {
          console.error("상세 에러:", error.errors);
          const errorDetails = error.errors
            .slice(0, 5)
            .map(
              (e) =>
                `곡: ${e.record?.songTitle || "알 수 없음"}, 오류: ${e.error}`
            )
            .join("\n");
          errorMessage += `\n\n상세 에러:\n${errorDetails}`;
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }

  // 메인 실행 함수
  async function main() {
    // 로딩 오버레이 표시
    createLoadingOverlay();

    try {
      // 1. 프로필 정보 우선 수집 (Gitadora ID 필수)
      // 로딩 오버레이 메시지 업데이트
      const overlay = document.getElementById("gitadora-loading-overlay");
      if (overlay) {
        const contentBox = overlay.querySelector("div");
        if (contentBox) {
          const message = contentBox.firstElementChild;
          if (message) {
            message.textContent = `프로필 정보 확인 중...`;
          }
        }
      }

      const profileInfo = await fetchProfileInfo();
      console.log("추출된 프로필 정보:", profileInfo);

      if (!profileInfo.gitadoraId) {
        removeLoadingOverlay();
        alert(
          "GITADORA ID를 찾을 수 없습니다.\n\n로그인 상태를 확인하거나, 프로필 페이지(playdata/profile.html)에 한 번 접속한 후 다시 시도해주세요."
        );
        return;
      }

      // 2. 스킬 데이터 수집
      const records = await collectAllSkillData();

      if (records.length === 0) {
        removeLoadingOverlay();
        alert(
          "추출된 데이터가 없습니다.\n\n다음을 확인해주세요:\n1. 스킬 페이지(playdata/skill.html)에서 실행했는지\n2. 브라우저 콘솔에 오류가 없는지"
        );
        return;
      }

      console.log(`총 ${records.length}개 기록 추출됨`);

      // 로딩 오버레이 메시지 업데이트
      if (overlay) {
        const contentBox = overlay.querySelector("div");
        if (contentBox) {
          const message = contentBox.firstElementChild;
          if (message) {
            message.textContent = `데이터 추출 완료!\n총 ${records.length}개\n업로드 중...`;
            message.style.whiteSpace = "pre-line";
          }
        }
      }

      // 3. 서버로 업로드
      const result = await uploadSkillData(records, profileInfo);

      // 로딩 오버레이 제거
      removeLoadingOverlay();

      // 4. 결과 표시
      if (result.success) {
        // 콘솔에 업로드된 데이터 출력
        console.log("=== 업로드 성공 ===");
        console.log(`생성된 기록 수: ${result.created}개`);

        // 업로드 성공 시 스킬 페이지로 바로 이동
        if (result.gameUserId) {
          const redirectUrl = `${API_BASE_URL}/user/${result.gameUserId}/skill`;
          window.location.href = redirectUrl;
        }
      } else {
        alert(
          "업로드에 실패했습니다: " + (result.message || "알 수 없는 오류")
        );
      }
    } catch (error) {
      removeLoadingOverlay();
      console.error("Main execution error:", error);
      alert("오류가 발생했습니다: " + (error.message || "알 수 없는 오류"));
    }
  }

  main();
})();
