document.getElementById("login-btn").addEventListener("click", function () {
    const accountId = document.getElementById("accountId").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!accountId || !password) {
        alert("아이디와 비밀번호를 모두 입력하세요.");
        return;
    }

    fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ accountId, password })
    })
        .then(async response => {
            const text = await response.text();

            if (!response.ok) {
                // 실패하면 무조건 로그인 실패 메시지
                alert("로그인 실패!");
                return;
            }

            const pureToken = text.replace("Bearer ", "");
            localStorage.setItem("accessToken", pureToken);
            alert("로그인 성공!");
            location.href = "../tripplanner/index.html";
        })
        .catch(error => {
            console.error("로그인 에러:", error);
            alert("로그인 실패!"); 
        });
});
