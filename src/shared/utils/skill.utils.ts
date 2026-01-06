/**
 * 스킬 점수에 따른 색상 스타일 반환
 * @param skill 스킬 점수
 * @returns background와 className을 포함한 스타일 객체
 */
export function getSkillColorStyle(skill: number): {
  background: string;
  className?: string;
} {
  if (skill >= 8500) {
    // RAINBOW - 무지개 그라데이션 (흐르는 애니메이션)
    return {
      background: "",
      className: "rainbow-animated",
    };
  } else if (skill >= 8000) {
    // GOLD - 금색
    return {
      background: "linear-gradient(135deg, #d4af37, #f4d03f, #d4af37, #b8860b)",
      className:
        "bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700",
    };
  } else if (skill >= 7500) {
    // SILVER - 은색
    return {
      background: "linear-gradient(135deg, #a8a8a8, #d3d3d3, #c0c0c0, #a8a8a8)",
      className: "bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500",
    };
  } else if (skill >= 7000) {
    // BRONZE - 청동색
    return {
      background: "linear-gradient(135deg, #cd7f32, #e6a857, #cd7f32)",
      className: "bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800",
    };
  } else if (skill >= 6500) {
    // RED gradation
    return {
      background: "linear-gradient(135deg, #dc2626, #ef4444, #dc2626)",
      className: "bg-gradient-to-br from-red-600 via-red-500 to-red-700",
    };
  } else if (skill >= 6000) {
    // RED
    return {
      background: "#dc2626",
      className: "bg-red-600",
    };
  } else if (skill >= 5500) {
    // PURPLE gradation
    return {
      background: "linear-gradient(135deg, #9333ea, #a855f7, #9333ea)",
      className:
        "bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700",
    };
  } else if (skill >= 5000) {
    // PURPLE
    return {
      background: "#9333ea",
      className: "bg-purple-600",
    };
  } else if (skill >= 4500) {
    // BLUE gradation
    return {
      background: "linear-gradient(135deg, #2563eb, #3b82f6, #2563eb)",
      className: "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700",
    };
  } else if (skill >= 4000) {
    // BLUE
    return {
      background: "#2563eb",
      className: "bg-blue-600",
    };
  } else if (skill >= 3500) {
    // GREEN gradation
    return {
      background: "linear-gradient(135deg, #16a34a, #22c55e, #16a34a)",
      className: "bg-gradient-to-br from-green-600 via-green-500 to-green-700",
    };
  } else if (skill >= 3000) {
    // GREEN
    return {
      background: "#16a34a",
      className: "bg-green-600",
    };
  } else if (skill >= 2500) {
    // YELLOW gradation
    return {
      background: "linear-gradient(135deg, #eab308, #facc15, #eab308)",
      className:
        "bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-600",
    };
  } else if (skill >= 2000) {
    // YELLOW
    return {
      background: "#eab308",
      className: "bg-yellow-500",
    };
  } else if (skill >= 1500) {
    // ORANGE gradation
    return {
      background: "linear-gradient(135deg, #ea580c, #f97316, #ea580c)",
      className:
        "bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700",
    };
  } else if (skill >= 1000) {
    // ORANGE
    return {
      background: "#ea580c",
      className: "bg-orange-600",
    };
  } else {
    // WHITE
    return {
      background: "#ffffff",
      className: "bg-white",
    };
  }
}
