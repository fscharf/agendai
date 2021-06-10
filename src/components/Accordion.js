import React from "react";

export default function Accordion({ children, title, id, className, hidden }) {
  return (
    <div
      className={`accordion ${className}`}
      id="accordionPanelsStayOpenExample"
    >
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className={`accordion-button ${hidden ? "collapsed" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${id}`}
            aria-expanded="true"
            aria-controls={id}
          >
            {title}
          </button>
        </h2>

        <div
          id={id}
          className={`accordion-collapse collapse ${hidden ? "" : "show"}`}
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
