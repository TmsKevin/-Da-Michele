import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  Sparkles,
  Star,
  Utensils,
  X,
} from "lucide-react";

const asset = (name: string) => `/manus-storage/${name}`;

const dishes = [
  { name: "Bruschette", description: "Geröstetes Brot, Tomate, Basilikum und Olivenöl", price: "9,50", category: "Antipasti", tag: "Vegetarisch", image: asset("burrata_pomodori_0baf1362.webp") },
  { name: "Insalata Caprese", description: "Tomaten, Mozzarella, Basilikum", price: "16", category: "Antipasti", tag: "Vegetarisch", image: asset("insalata_di_arance_bd2b69aa.webp") },
  { name: "Parmigiana", description: "Hausgemachter Auberginen-Auflauf", price: "16", category: "Antipasti", tag: "Klassiker", image: asset("parmigiana_ec9fd276.webp") },
  { name: "Pasta Aglio & Olio", description: "Pasta mit Knoblauch und Olivenöl", price: "9,50", category: "Pasta", tag: "Vegan", image: asset("calamaretti_73cddf1b.webp") },
  { name: "Pasta Napoli", description: "Pasta mit Tomatensauce und Parmigiano", price: "10", category: "Pasta", tag: "Vegetarisch", image: asset("burrata_caponata_a1a72bfb.webp") },
  { name: "Pasta All'Amatriciana", description: "Tomatensauce, Guanciale und Zwiebeln", price: "18", category: "Pasta", tag: "Tradizionale", image: asset("carree_di_vitello_48fecac6.webp") },
  { name: "Pizza Calabrese", description: "Mit scharfer Salami", price: "16", category: "Pizza", tag: "Piccante", image: asset("tartare_di_salmone_26e64e30.webp") },
  { name: "Pizza Salsiccia Rapa", description: "Salsiccia und Rapa, saisonal wechselnd", price: "18", category: "Pizza", tag: "Della casa", image: asset("ceviche_di_salmone_589f33fb.webp") },
  { name: "Pescato del giorno", description: "Täglich wechselndes Fischgericht aus der Tageskarte", price: "tagespreis", category: "Pesce", tag: "Tageskarte", image: asset("tonno_crudo_rapa_rossa_spinaci_48175efe.webp") },
  { name: "Tagliata", description: "Zartes Rind, saisonale Beilagen", price: "tagespreis", category: "Carne", tag: "Tageskarte", image: asset("tagliata_21d9b212.webp") },
  { name: "Dolce del giorno", description: "Hausgemachte Süßspeise nach Tagesangebot", price: "tagespreis", category: "Dolci", tag: "Tageskarte", image: asset("voucher_09cf47d4.webp") },
];

const categories = ["Alle", "Antipasti", "Pasta", "Pizza", "Pesce", "Carne", "Dolci"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reserved, setReserved] = useState(false);

  const filteredDishes = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return dishes.filter((dish) => {
      const matchesCategory = activeCategory === "Alle" || dish.category === activeCategory;
      const matchesQuery = !normalized || `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const openReservation = () => {
    setReservationOpen(true);
    setReserved(false);
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Da Michele Startseite">
          <span className="brand-mark">DM</span>
          <span className="brand-copy"><b>RISTORANTE</b><em>DA MICHELE</em></span>
        </a>
        <nav className={mobileMenu ? "main-nav is-open" : "main-nav"}>
          <a href="#menu" onClick={() => setMobileMenu(false)}>Speisekarte</a>
          <a href="#filosofia" onClick={() => setMobileMenu(false)}>Unsere Küche</a>
          <a href="#visita" onClick={() => setMobileMenu(false)}>Besuch uns</a>
          <button className="nav-reserve" onClick={openReservation}>Tisch reservieren <ArrowRight size={15} /></button>
        </nav>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menü öffnen">
          {mobileMenu ? <X size={21} /> : <MenuIcon size={21} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Ristorante Da Michele Baden-Baden <span className="eyebrow-dot">✦</span></div>
          <h1>Italienische <i>Küche.</i><br />Mitten in Baden-Baden.</h1>
          <p className="hero-lede">Eine täglich wechselnde Karte mit frischen Fisch- und Fleischgerichten sowie den üblichen italienischen Klassikern.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Speisekarte ansehen <ArrowRight size={16} /></button>
            <button className="text-link" onClick={openReservation}>Tisch sichern <span>↗</span></button>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">HEUTE GEÖFFNET</span><strong>12:00 — 14:00 · 18:00 — 21:30</strong></div>
            <div><span className="meta-label">BADEN-OOS</span><strong>Rheinstr. 109</strong></div>
          </div>
        </div>
        <div className="hero-visual">
          <img src={asset("team_d491b7da.webp")} alt="Das Team von Ristorante Da Michele Baden-Baden" />
          <div className="hero-image-shade" />
          <div className="hero-stamp"><span>DAL 1870</span><strong>Da<br /><i>Napoli</i><br />con amore</strong></div>
          <div className="hero-caption"><span>01 / 04</span><span>La nostra famiglia, ogni giorno.</span></div>
        </div>
        <div className="scroll-note"><span /> SCROLL TO TASTE</div>
      </section>

      <section className="intro-strip" id="filosofia">
        <div className="intro-number">01</div>
          <div className="intro-title"><span>Unsere</span><strong>Tradizione</strong></div>
        <div className="intro-text">Seit 1870 steht Da Michele für italienische Gastfreundschaft und eine Küche, die sich an den besten Produkten des Tages orientiert. In Baden-Baden kocht die Familie Romano mit derselben Liebe zum Detail.</div>
        <div className="intro-signature">con amore,<br /><span>la famiglia Romano</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><span className="kicker">Cosa c'è di nuovo</span><h2>Die Tageskarte</h2></div>
          <p>Frische Fisch- und Fleischgerichte, italienische Klassiker und wechselnde Empfehlungen aus der Küche.</p>
        </div>
        <div className="menu-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Kategorien">
            {categories.map((category) => <button key={category} className={activeCategory === category ? "category-tab active" : "category-tab"} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Gericht suchen …" aria-label="Gericht suchen" />{query && <button onClick={() => setQuery("")} aria-label="Suche löschen"><X size={15} /></button>}</label>
        </div>
        <div className="dish-grid">
          {filteredDishes.map((dish, index) => (
            <article className="dish-card" key={dish.name} style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
              <div className="dish-photo"><img src={dish.image} alt={dish.name} /><span className="dish-tag">{dish.tag}</span><button className="dish-arrow" aria-label={`${dish.name} auswählen`} onClick={() => setQuery(dish.name)}>↗</button></div>
              <div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><span className="dish-price">{dish.price} <small>€</small></span></div>
            </article>
          ))}
        </div>
        {filteredDishes.length === 0 && <div className="empty-state"><Sparkles size={18} /><strong>Nichts gefunden.</strong><span>Probier „Pasta“, „Pizza“ oder „Tiramisu“.</span></div>}
        <div className="menu-footer"><span>Alle Preise in Euro · Änderungen vorbehalten</span><button className="button button-dark" onClick={() => { setActiveCategory("Alle"); setQuery(""); }}>Vollständige Karte <ArrowRight size={16} /></button></div>
      </section>

      <section className="experience-section">
        <div className="experience-image"><img src={asset("team_d491b7da.webp")} alt="Das Team von Ristorante Da Michele" /><div className="image-label"><span>02</span><strong>La tavola<br /><i>è pronta.</i></strong></div></div>
        <div className="experience-copy"><span className="kicker">Über uns</span><h2>Große Küche<br /><i>im Kleinen.</i></h2><p>Im typischen Dekor eines Pizza-Pasta-Italieners findet man bei uns, einen Steinwurf vom Baden-Badener Bahnhof entfernt, große italienische Küche.</p><div className="feature-list"><div><Star size={16} /><span>Täglich wechselnde Karte</span></div><div><Utensils size={16} /><span>Frische Fisch- und Fleischgerichte</span></div><div><Sparkles size={16} /><span>Italienische Klassiker mit Anspruch</span></div></div><a className="text-link dark-link" href="/restaurant">Mehr über uns <span>↗</span></a></div>
      </section>

      <section className="visit-section" id="visita">
        <div className="visit-left"><span className="kicker">Vieni a trovarci</span><h2>Bis bald<br /><i>bei uns.</i></h2><p>Rheinstr. 109<br />76532 Baden-Baden · Baden-Oos</p><a className="button button-dark" href="tel:+49722161541">Anrufen <Phone size={16} /></a></div>
        <div className="visit-right"><div className="hours-card"><div className="hours-title"><Clock3 size={18} /><span>Öffnungszeiten</span></div><div className="hours-row"><span>Montag</span><b>12:00 — 14:00</b></div><div className="hours-row"><span>Dienstag</span><b>Geschlossen</b></div><div className="hours-row"><span>Mi — Sa</span><b>12:00 — 14:00 · 18:00 — 21:30</b></div><div className="hours-row"><span>Sonntag</span><b>18:00 — 21:30</b></div></div><div className="contact-links"><a href="tel:+49722161541"><Phone size={15} /> 07221 — 61541</a><a href="mailto:info@da-michele.com"><Instagram size={15} /> info@da-michele.com</a><a href="https://maps.google.com/?q=Rheinstrasse+109+Baden-Baden" target="_blank" rel="noreferrer"><MapPin size={15} /> Route planen <ArrowRight size={14} /></a></div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">DM</span><span>Ristorante Da Michele</span></div><span>© 2026 Ristorante Da Michele · Baden-Baden</span><div className="footer-links"><a href="https://github.com/da-michele/da-michele.com" target="_blank" rel="noreferrer">GitHub</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/bedingungen">Bedingungen</a></div></footer>

      {reservationOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setReservationOpen(false); }}><div className="reservation-modal"><button className="modal-close" onClick={() => setReservationOpen(false)} aria-label="Reservierung schließen"><X /></button>{reserved ? <div className="reserved-state"><span className="success-mark">✓</span><span className="kicker">Perfetto</span><h2>Dein Tisch<br /><i>ist angefragt.</i></h2><p>Wir melden uns gleich bei dir mit der Bestätigung.</p><button className="button button-dark" onClick={() => setReservationOpen(false)}>Schließen</button></div> : <><span className="kicker">La tua serata</span><h2>Tisch<br /><i>reservieren.</i></h2><p className="modal-copy">Sag uns, wann du kommen möchtest — wir halten dir den besten Platz frei.</p><div className="reservation-fields"><label><span>Datum</span><div><CalendarDays size={16} /><input type="date" defaultValue="2024-06-21" /></div></label><label><span>Uhrzeit</span><div><Clock3 size={16} /><select defaultValue="19:30"><option>18:30</option><option>19:30</option><option>20:30</option><option>21:00</option></select><ChevronDown size={15} /></div></label><label><span>Gäste</span><div><Utensils size={16} /><select defaultValue="2 Personen"><option>2 Personen</option><option>3 Personen</option><option>4 Personen</option><option>5+ Personen</option></select><ChevronDown size={15} /></div></label></div><button className="button button-dark full-button" onClick={() => setReserved(true)}>Anfrage senden <ArrowRight size={16} /></button></>}</div></div>}
    </main>
  );
}

// React.CSSProperties is used for the stagger custom property above.
