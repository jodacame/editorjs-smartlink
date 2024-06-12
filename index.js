import axios from "axios";
import Templates from "./templates.js";
import Render from "./render.js";
import "./styles/index.css";
class SmartLink {
  constructor({ data, api, config }) {
    this.api = api;
    this.data = data;
    this.config = {
      endpoint: config.endpoint,
      headers: config.headers,
      templates: {
        ...Templates,
        ...config.templates,
      },
    };
  }

  static get pasteConfig() {
    return {
      // A and Plain Text
      tags: ["A"],
      // patterns: {
      //   text: /https?:\/\/\S+\.\S+/,
      // },
    };
  }

  async onPaste(event) {
    console.log("onPaste", event);
    const data = {
      link: event.detail.data.href,
      type: "link",
      metadata: {},
    };
    data.metadata = await this.processLink(data, event.detail.data.innerText);
    data.metadata = {
      title: event.detail.data.innerText,
      ...data.metadata,
    };
    // Override the type if the metadata has a type
    if (data.metadata.type) {
      data.type = data.metadata.type;
      delete data.metadata.type;
    }
    this.data = data;
    this.showPreview(data);
  }

  async processLink(data, title) {
    this.container.classList.add("smart-link__loading");
    const response = await axios.get(
      `${this.config.endpoint}?url=${encodeURIComponent(data.link)}&title=${title}`,
      {
        headers: this.config.headers,
      }
    );
    return response.data;
  }

  render() {
    this.container = document.createElement("div");
    this.container.classList.add("smart-link");
    const loader = document.createElement("div");
    loader.classList.add("smart-link__loader");
    this.container.appendChild(loader);
    if (this.data.metadata) {
      this.showPreview(this.data);
    }
    return this.container;
  }

  showPreview(data) {
    const template = this.config.templates[this.data.type] || this.config.templates.default;
    this.container.innerHTML = Render(data.metadata, template);
    if (data.metadata.editable) {
      this.container.contentEditable = !this.readOnly;
    }

    this.container.classList.remove("smart-link__loading");
  }

  save(blockContent) {
    return this.data;
  }
}

export default SmartLink;
export { Templates, Render };
