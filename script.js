const project = [
    {
        title:"Men style Hub",
        image:"istockphoto-887360960-612x612.jpg",
        description:"A Website for purchase clothes online",
        technologies:"HTML | CSS | JavaScript",
    }
    ,
    {
        title:"Real Time Chat App",
        image:"build-a-realtime-chat-app-from-scratch--1-.png",  
        description:"A real time chat application using web sockets",
        technologies:"React | Socket.io | Node.js",
    }
];

    const projectContainer = document.getElementById("projectContainer");

    projectContainer.innerHTML = project.map(project => `
    <div class="project-card">
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p class="tech">${project.technologies}</p>
    </div>`)
  .join("");


function downloadResume() {
  const link = document.createElement("a");
  link.href = "Brian Robert Resume (3).pdf";
  link.download = "Brian Robert Resume (3).pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    alert("Submitting form...");
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    try {
        
        const res = await fetch("http://127.0.0.1:8000/api/contact/", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert(result.message || "Message sent successfully!");
            this.reset();
        } else {
            alert(result.message || "Error sending message");
        }
    } catch (err) {
        alert("Server not reachable");
        console.error(err);
    }
});
