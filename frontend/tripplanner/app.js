document.getElementById("save-btn").addEventListener("click", function () {
  const input = document.getElementById("new-place");
  const value = input.value.trim();

  if (!value) {
    alert("장소를 입력하세요.");
    return;
  }

  // 기본은 오전에 추가
  const morningBox = document.getElementById("morning");
  const p = document.createElement("p");
  p.textContent = value;
  morningBox.appendChild(p);

  input.value = "";
});

// (추후 일정 탭 추가, 장소 목록 연동, 상세보기 등은 확장 가능)
