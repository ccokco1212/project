let currentDay = 1;
let dayCount = 2;

document.addEventListener("DOMContentLoaded", () => {
  setupInitialSchedule();
});

function setupInitialSchedule() {
  const container = document.getElementById("schedule-container");
  const day1 = document.createElement("div");
  day1.className = "day-schedule";
  day1.id = "day-1";
  day1.innerHTML = `
    <h3>오전</h3>
    <div class="dropzone" id="morning-1"></div>
    <h3>오후</h3>
    <div class="dropzone" id="afternoon-1"></div>
  `;
  container.appendChild(day1);
}

document.getElementById("save-btn").addEventListener("click", function () {
  const input = document.getElementById("new-place");
  const value = input.value.trim();

  if (!value) {
    alert("일정 제목을 입력하세요.");
    return;
  }

  appendToSchedule(value, "morning");
  alert(`"${value}" 일정이 생성되었습니다.`);
  input.value = "";
});

function handleSearch() {
  const city = document.getElementById("city").value.trim();
  const category = document.getElementById("category").value;

  if (!city || !category) {
    alert("도시와 카테고리를 모두 선택하세요.");
    return;
  }

  const query = `${city} ${category}`;
  searchPlace(query);
}

function searchPlace(keyword) {
  fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`, {
    method: "GET",
    headers: {
      Authorization: "KakaoAK 7009ad20b9a43d0d60da3f6a63510c8a"
    }
  })
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById("search-results");
      resultDiv.innerHTML = "";

      if (!data.documents || data.documents.length === 0) {
        resultDiv.innerHTML = "<p>검색 결과가 없습니다.</p>";
        return;
      }

      data.documents.forEach(place => {
        const item = document.createElement("div");
        item.className = "place-item";
        item.innerHTML = `
          <div>
            <strong>${place.place_name}</strong><br>
            <span>${place.road_address_name || place.address_name}</span><br>
            <small>${place.phone || "전화번호 없음"}</small>
          </div>
          <div>
          <button class="save-btn" onclick='addToSchedule(${JSON.stringify(place.place_name)}, "morning", ${JSON.stringify(place.road_address_name || place.address_name)}, ${JSON.stringify(place.phone || "전화번호 없음")})'>오전 추가</button>
          <button class="save-btn" onclick='addToSchedule(${JSON.stringify(place.place_name)}, "afternoon", ${JSON.stringify(place.road_address_name || place.address_name)}, ${JSON.stringify(place.phone || "전화번호 없음")})'>오후 추가</button>
          </div>
        `;
        resultDiv.appendChild(item);
      });
    })
    .catch(err => {
      console.error("카카오 장소 검색 오류:", err);
      alert("카카오 API 요청에 실패했습니다.");
    });
}

function addToSchedule(placeName, time, address = "", phone = "") {
  const targetZone = document.getElementById(`${time}-${currentDay}`);
  if (!targetZone) return;

  const div = document.createElement("div");
  div.className = "scheduled-item";
  div.innerHTML = `
    <strong>${placeName}</strong><br>
    <span>${address}</span><br>
    <small>${phone || "전화번호 없음"}</small>
  `;
  div.addEventListener("dblclick", () => {
    if (confirm("이 장소를 삭제하시겠습니까?")) {
      div.remove();
    }
  });

  targetZone.appendChild(div);
}


function appendToSchedule(placeName, time) {
  addToSchedule(placeName, time);
}

function addDay() {
  dayCount++;
  const tabContainer = document.getElementById("tab-container");
  const newTab = document.createElement("button");
  newTab.className = "tab";
  newTab.textContent = `Day ${dayCount}`;
  newTab.onclick = () => switchDay(dayCount);
  tabContainer.insertBefore(newTab, tabContainer.lastElementChild);

  const container = document.getElementById("schedule-container");

  const newSchedule = document.createElement("div");
  newSchedule.className = "day-schedule";
  newSchedule.id = `day-${dayCount}`;
  newSchedule.style.display = "none";
  newSchedule.innerHTML = `
    <h3>오전</h3>
    <div class="dropzone" id="morning-${dayCount}"></div>
    <h3>오후</h3>
    <div class="dropzone" id="afternoon-${dayCount}"></div>
  `;
  container.appendChild(newSchedule);

  switchDay(dayCount);
}

function switchDay(dayNum) {
  currentDay = dayNum;

  const allSchedules = document.querySelectorAll(".day-schedule");
  allSchedules.forEach((div, index) => {
    div.style.display = (index + 1 === dayNum) ? "block" : "none";
  });

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.classList.remove("active"));
  tabs[dayNum - 1].classList.add("active");
}
