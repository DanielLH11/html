class DevJobsAvatarElement extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de HTMLElement

        this.attachShadow({ mode: "open" });
    }

    render() {


        const service = this.getAttribute("service") || "github";
        const username = this.getAttribute("username") || "juan-pablo-lopez";
        const size = this.getAttribute("size") || "32";

        console.log(service, username, size);

        this.shadowRoot.innerHTML = `
            <img 
                src="${this.createAvatarUrl(service, username)}" 
                alt="Avatar" 
                width="${size}"
                height="${size}"
                style="border-radius: 50%; border: 2px solid #000;"
            />
        `;
    }


    createAvatarUrl(service, username) {
        return `https://unavatar.io/${service}/${username}`;
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define("devjobs-avatar", DevJobsAvatarElement);