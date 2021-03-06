import {RubricsElement} from "./rubrics-element.js";
import {html} from "/webcomponents/assets/lit-element/lit-element.js";
import "./sakai-rubric-criteria-readonly.js";
import "./sakai-rubric-pdf.js";
import {tr} from "./sakai-rubrics-language.js";

export class SakaiRubricReadonly extends RubricsElement {

  constructor() {

    super();

    this.rubricExpanded = true;
    this.enablePdfExport = false;
  }

  static get properties() {

    return {
      rubric: { type: Object },
      enablePdfExport: { attribute: "enable-pdf-export", type: Boolean },
    };
  }

  shouldUpdate() {
    return this.rubric;
  }

  render() {

    return html`
      <div class="rubric-title" @click="${this.toggleRubric}">
        <div>
          <span class="rubric-name" id="rubric_toggle_shared_${this.rubric.id}" aria-expanded="${this.rubricExpanded}" role="tab" title="${tr("toggle_details")} ${this.rubric.title}" tabindex="0" >
            <span class="fa fa-chevron-right"></span>
            ${this.rubric.title}
          </span>
        </div>

        <div class="hidden-xs">${this.rubric.siteTitle}</div>
        <div class="hidden-xs">${this.rubric.creatorDisplayName}</div>
        <div class="hidden-xs">${this.rubric.formattedModifiedDate}</div>

        <div class="actions">
          <div class="action-container">
            <span class="hidden-sm hidden-xs sr-only"><sr-lang key="copy" /></span>
            <span role="button" title="${tr("copy_to_site", [this.rubric.title])}" tabindex="0" class="clone fa fa-copy" @click="${this.copyToSite}"></span>
          </div>
          ${this.enablePdfExport ? html`
            <div class="action-container">
              <sakai-rubric-pdf
                  site-id="${this.siteId}"
                  rubric-title="${this.rubric.title}"
                  rubricId="${this.rubric.id}"
              />
            </div>
          ` : ""}
        </div>
      </div>

      <div class="collapse-details" role="tabpanel" aria-labelledby="rubric_toggle_${this.rubric.id}" id="collapse_shared_${this.rubric.id}">
        <div class="rubric-details style-scope sakai-rubric">
          <sakai-rubric-criteria-readonly criteria="${JSON.stringify(this.rubric.criteria)}" .weighted=${this.rubric.weighted}></sakai-rubric-criteria-readonly>
        </div>
      </div>
    `;
  }

  toggleRubric() {

    const titlecontainer = this.querySelector(".rubric-title");

    const collapse = $(`#collapse_shared_${this.rubric.id}`);
    collapse.toggle();

    const icon = $(`#rubric_toggle_shared_${this.rubric.id} span`);

    if (collapse.is(":visible")) {
      this.rubricExpanded = "true";
      titlecontainer.classList.add("active");
      icon.removeClass("fa-chevron-right").addClass("fa-chevron-down");
    } else {
      this.rubricExpanded = "false";
      titlecontainer.classList.remove("active");
      icon.removeClass("fa-chevron-down").addClass("fa-chevron-right");
    }
  }

  cloneRubric(e) {

    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('clone-rubric', { detail: this.rubric }));
  }

  copyToSite(e) {

    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('copy-to-site', { detail: this.rubric.id }));
  }
}

customElements.define("sakai-rubric-readonly", SakaiRubricReadonly);
