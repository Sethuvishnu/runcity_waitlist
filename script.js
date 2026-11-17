/* ---------- CONTACT SETTINGS: fill these in before you deploy ---------- */
const CONTACT_EMAIL = "";   // where form requests are sent
const CALENDAR_URL  = "";   // e.g. your booking link

/* ---------- HERO VIDEO: put your best work in the opening card ----------
   1. Save the file in the video/ folder (MP4, H.264, 1080p, ideally under 10 MB).
   2. Set the path below. Leave it empty to keep the default card. */
const HERO_VIDEO  = "superdooper_main_1.mp4";   // e.g. "video/work.mp4"
const HERO_POSTER = "";   // optional still image shown first, e.g. "video/work.jpg"
(function () {
  if (!HERO_VIDEO) return;
  const v = document.getElementById("heroVideo");
  if (HERO_POSTER) v.poster = HERO_POSTER;
  v.src = HERO_VIDEO;
  v.addEventListener("loadeddata", function () {
    document.getElementById("heroCard").classList.add("has-video");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(function () {});
  });
})();

document.getElementById("y").textContent = new Date().getFullYear();
const cal = document.getElementById("cal");
if (CALENDAR_URL) { cal.href = CALENDAR_URL; cal.target = "_blank"; cal.rel = "noopener"; } else { cal.parentElement.hidden = true; }
document.getElementById("f").addEventListener("submit", function (e) {
  e.preventDefault();
  const st = document.getElementById("st"), d = new FormData(this);
  if (!d.get("name") || !/^\S+@\S+\.\S+$/.test(d.get("email") || "")) { st.textContent = "Add your name and a valid email so we can reply."; return; }
  if (!CONTACT_EMAIL) { st.textContent = "Contact email is not configured yet. Please try again shortly."; return; }
  const body = ["Name: " + d.get("name"), "Email: " + d.get("email"), "Product and launch date: " + (d.get("product") || "-"), "Level: " + (d.get("tier") || "-"), "", d.get("msg") || ""].join("\n");
  location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Launch fit call: " + d.get("name")) + "&body=" + encodeURIComponent(body);
  st.textContent = "Your email app should open with the request filled in. Send it to finish.";
});

/* ---------- HERO SCROLL ANIMATION (GSAP) ----------
   The final card size and position come from the --card-* values in style.css. */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const root = getComputedStyle(document.documentElement);
  const probe = document.body.appendChild(document.createElement("div"));
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
  const css = n => root.getPropertyValue(n).trim();
  const w = n => { probe.style.width = css(n); return probe.offsetWidth; };
  const h = n => { probe.style.height = css(n); return probe.offsetHeight; };
  const SCROLL_LENGTH = "+=120%";   // how long the hero stays pinned
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", function () {
    const W = () => w("--card-w"), H = () => h("--card-h"), Y = () => -h("--card-lift"), R = parseFloat(css("--card-radius"));
    gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: ".stage", start: "top top", end: SCROLL_LENGTH, pin: true, scrub: .5, anticipatePin: 1, invalidateOnRefresh: true } })
      .fromTo("#heroCard", { width: () => innerWidth, height: () => innerHeight, borderRadius: 0, y: 0 }, { width: W, height: H, borderRadius: R, y: Y, duration: 1 }, 0)
      .fromTo(".bgword", { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
      .fromTo(".front", { scale: 1.08, y: 0 }, { scale: .86, y: Y, duration: 1 }, 0)
      .fromTo(".marq", { opacity: 0 }, { opacity: 1, duration: .5 }, .35)
      .to("#cue", { autoAlpha: 0, duration: .2 }, 0)
      .fromTo("#caption", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: .4, ease: "power2.out" }, .75);
  });
}
