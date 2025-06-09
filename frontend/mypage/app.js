document.addEventListener("DOMContentLoaded", () => {
  loadTrips();
  loadUserInfo();
});

function loadTrips() {
  const data = [
    {
      id: 1,
      title: "경주여행",
      days: [
        {
          day: 1,
          morning: [
            { placeName: "경주보문관광단지", address: "경북 경주시 신평동 719-203", phone: "전화번호 없음" },
            { placeName: "경주월드", address: "경북 경주시 보문로 544", phone: "1544-8765" },
            { placeName: "경주왕동마을", address: "경북 경주시 강동면 양동리 125", phone: "054-762-2630" }
          ],
          afternoon: [
            { placeName: "동궁과월지", address: "경북 경주시 원화로 102", phone: "054-750-8655" },
            { placeName: "경주왕동마을", address: "경북 경주시 강동면 양동리 125", phone: "054-762-2630" },
            { placeName: "경주동궁원", address: "경북 경주시 보문로 74-14", phone: "054-779-8725" }
          ]
        }
      ]
    }
  ];

  const container = document.getElementById("trip-container");
  container.innerHTML = "";

  data.forEach(trip => {
    const div = document.createElement("div");
    div.className = "trip-item";

    const detailId = `detail-${trip.id}`;

    div.innerHTML = `
      <div>
        <div class="trip-title">${trip.title}</div>
        <button class="detail-btn" onclick="toggleDetail('${detailId}')">자세히 보기</button>
        <div class="trip-detail hidden" id="${detailId}">
          ${renderTripDetail(trip.days)}
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

function renderTripDetail(days) {
  let html = "";
  days.forEach(day => {
    html += `<h4>Day ${day.day}</h4>`;
    html += `<h4>오전</h4><div class="dropzone">`;
    day.morning.forEach(p => {
      html += `<p>${p.placeName} ${p.address} ${p.phone || ""}</p>`;
    });
    html += `</div><h4>오후</h4><div class="dropzone">`;
    day.afternoon.forEach(p => {
      html += `<p>${p.placeName} ${p.address} ${p.phone || ""}</p>`;
    });
    html += `</div>`;
  });
  return html;
}

function toggleDetail(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
}

function loadUserInfo() {
  document.getElementById("email").value = "user@example.com";
}

function updateInfo() {
  alert("더미 모드에서는 수정 불가");
}

function logout() {
  localStorage.removeItem("accessToken");
  location.href = "../login/index.html";
}
