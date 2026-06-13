(function () {

  const CLARITY_ID = "x4goagdxw6";
  const STORAGE_KEY = "builtsmart_cookie_consent";

  function loadClarity() {
    if (window.clarityLoaded) return;

    window.clarityLoaded = true;

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };

      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;

      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);

    })(window, document, "clarity", "script", CLARITY_ID);
  }

  function saveConsent(options) {

    const consentOptions = options || {};

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        necessary: true,
        analytics: consentOptions.analytics === true,
        marketing: consentOptions.marketing === true,
        date: new Date().toISOString(),
        version: "2026-06"
      })
    );

    closeBanner();

    if (consentOptions.analytics === true) {
      loadClarity();
    }
  }

  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function closeBanner() {
    const banner = document.getElementById("bs-cookie-banner");

    if (banner) {
      banner.remove();
    }
  }

  function createBanner(showSettings) {

    closeBanner();

    const consent = getConsent();

    const analyticsChecked =
      consent && consent.analytics === true
        ? "checked"
        : "";

    const banner = document.createElement("div");

    banner.id = "bs-cookie-banner";

    const marketingChecked =
      consent && consent.marketing === true
        ? "checked"
        : "";

    banner.innerHTML = showSettings
      ? `
        <div class="bs-cookie-panel bs-cookie-panel-settings" role="dialog" aria-modal="true" aria-labelledby="bs-cookie-title">

          <button
            id="bs-cookie-close"
            class="bs-cookie-close"
            type="button"
            aria-label="Cookie-Einstellungen schließen und nur notwendige Technologien verwenden"
          >
            ×
          </button>

          <div class="bs-cookie-header">
            <p class="bs-cookie-label">BuiltSmart AI</p>
            <h2 id="bs-cookie-title">Cookie-Einstellungen</h2>
            <p class="bs-cookie-text">
              Legen Sie fest, welche optionalen Dienste BuiltSmart AI verwenden darf.
            </p>
          </div>

          <div class="bs-cookie-settings">

            <div class="bs-cookie-category">
              <div>
                <strong>Notwendige Technologien</strong>
                <p>Erforderlich für Betrieb, Sicherheit und Grundfunktionen der Website. Diese Kategorie kann nicht deaktiviert werden.</p>
              </div>
              <span class="bs-cookie-badge">Immer aktiv</span>
            </div>

            <label class="bs-cookie-category bs-cookie-toggle-row">
              <div>
                <strong>Analyse</strong>
                <p>Microsoft Clarity hilft, Klicks, Scrollverhalten und Nutzungsmuster zu verstehen und Inhalte zu verbessern.</p>
              </div>
              <input id="bs-cookie-analytics" type="checkbox" ${analyticsChecked}>
            </label>

            <label class="bs-cookie-category bs-cookie-toggle-row">
              <div>
                <strong>Marketing</strong>
                <p>Derzeit nicht aktiv. Vorgesehen für Google Ads, Google Tag Manager und Conversion-Messung, sofern diese Dienste später eingebunden werden.</p>
              </div>
              <input id="bs-cookie-marketing" type="checkbox" ${marketingChecked}>
            </label>

          </div>

          <p class="bs-cookie-links">
            Details:
            <a href="https://www.built-smart-hub.com/datenschutz" target="_blank" rel="noopener">Datenschutz & Cookies</a>.
          </p>

          <div class="bs-cookie-actions">
            <button id="bs-cookie-necessary" class="bs-cookie-button bs-cookie-button-secondary" type="button">Alle ablehnen</button>
            <button id="bs-cookie-save" class="bs-cookie-button bs-cookie-button-dark" type="button">Auswahl speichern</button>
            <button id="bs-cookie-accept-all" class="bs-cookie-button bs-cookie-button-primary" type="button">Zustimmen</button>
          </div>

        </div>
      `
      : `
        <div class="bs-cookie-panel">

          <p class="bs-cookie-text">
            Diese Website verwendet notwendige Technologien für den technisch erforderlichen Betrieb. Mit Ihrer Einwilligung nutzen wir zusätzliche Dienste zur Nutzungsanalyse und zur Erfolgsmessung künftiger Marketingmaßnahmen.
            <a href="https://www.built-smart-hub.com/datenschutz" target="_blank" rel="noopener">Datenschutz & Cookies</a>
          </p>

          <div class="bs-cookie-actions">
            <button id="bs-cookie-settings" class="bs-cookie-button bs-cookie-button-link" type="button">Einstellungen</button>
            <button id="bs-cookie-necessary" class="bs-cookie-button bs-cookie-button-secondary" type="button">Alle ablehnen</button>
            <button id="bs-cookie-accept-all" class="bs-cookie-button bs-cookie-button-primary" type="button">Zustimmen</button>
          </div>

          <button
            id="bs-cookie-close"
            class="bs-cookie-close"
            type="button"
            aria-label="Cookie-Hinweis schließen und nur notwendige Technologien verwenden"
          >
            ×
          </button>

        </div>
      `;

    document.body.appendChild(banner);

    document
      .getElementById("bs-cookie-necessary")
      .addEventListener("click", function () {
        saveConsent({
          analytics: false,
          marketing: false
        });
      });

    document
      .getElementById("bs-cookie-close")
      .addEventListener("click", function () {
        saveConsent({
          analytics: false,
          marketing: false
        });
      });

    const settingsButton = document.getElementById("bs-cookie-settings");

    if (settingsButton) {
      settingsButton.addEventListener("click", function () {
        createBanner(true);
      });
    }

    const saveButton = document.getElementById("bs-cookie-save");

    if (saveButton) {
      saveButton.addEventListener("click", function () {

        const analyticsAccepted =
          document.getElementById("bs-cookie-analytics").checked;

        const marketingAccepted =
          document.getElementById("bs-cookie-marketing").checked;

        saveConsent({
          analytics: analyticsAccepted,
          marketing: marketingAccepted
        });
      });
    }

    document
      .getElementById("bs-cookie-accept-all")
      .addEventListener("click", function () {
        saveConsent({
          analytics: true,
          marketing: true
        });
      });
  }

  window.openBuiltSmartCookieSettings = function () {
    createBanner(true);
  };

  window.openBuiltSmartCookieBanner = function () {
    createBanner(false);
  };

  document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    if (params.get("cookie-preview") === "banner") {
      createBanner(false);
      return;
    }

    if (params.get("cookie-preview") === "settings") {
      createBanner(true);
      return;
    }

    const consent = getConsent();

    if (consent && consent.analytics === true) {
      loadClarity();
      return;
    }

    if (consent && consent.analytics === false) {
      return;
    }

    createBanner();
  });

})();
