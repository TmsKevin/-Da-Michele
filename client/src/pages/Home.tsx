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
  { name: "Pizza Pane", description: "Pizzabrot, frisch aus dem Ofen", price: "5,00", category: "Pizza", tag: "Klassiker", image: asset("Innen1_b850898b.jpg") },
  { name: "Margherita", description: "Tomatensoße, Mozzarella", price: "10,00", category: "Pizza", tag: "Klassiker", image: asset("Innen1_b850898b.jpg") },
  { name: "Salami", description: "Tomatensoße, Salami, Mozzarella", price: "12,00", category: "Pizza", tag: "Beliebt", image: asset("Innen2_623c7391.jpg") },
  { name: "Paesana", description: "Schinken, Salami, Champignons, Mozzarella", price: "14,50", category: "Pizza", tag: "Hausfavorit", image: asset("Innen1_b850898b.jpg") },
  { name: "Capricciosa", description: "Schinken, Champignons, Zwiebeln, Artischocken, Mozzarella", price: "15,00", category: "Pizza", tag: "Klassiker", image: asset("Innen2_623c7391.jpg") },
  { name: "Diavolo", description: "Wurst, Ei, Zwiebeln, Paprika, Peperoni, Mozzarella", price: "16,00", category: "Pizza", tag: "Piccante", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Alla Casa", description: "Tomatenstückchen, Rucola, Parmaschinken, Mozzarella", price: "18,00", category: "Pizza", tag: "Della casa", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Ai Frutti di Mare", description: "Meeresfrüchte, Gambas, Mozzarella", price: "20,00", category: "Pizza", tag: "Mare", image: asset("Innen1_b850898b.jpg") },
  { name: "Pinsa Sicilia", description: "Thunfisch, Sardellen, Oliven, Mozzarella", price: "15,00", category: "Pinsa", tag: "Pinsa", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Pinsa Vegetariana", description: "Paprika, Artischocke, Cocktailtomaten, Spinat, Oliven, Zwiebeln", price: "15,00", category: "Pinsa", tag: "Vegetarisch", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Pinsa Campana", description: "Steinpilze, Büffelmozzarella", price: "15,00", category: "Pinsa", tag: "Pinsa", image: asset("Innen2_623c7391.jpg") },
  { name: "Spaghetti Aglio Olio", description: "Olivenöl, Knoblauch, Peperoni", price: "10,00", category: "Pasta", tag: "Klassiker", image: asset("Innen2_623c7391.jpg") },
  { name: "Spaghetti Bolognese", description: "Mit Bolognese-Soße", price: "12,00", category: "Pasta", tag: "Klassiker", image: asset("Innen1_b850898b.jpg") },
  { name: "Spaghetti Carbonara", description: "Speck, Ei, Parmesan", price: "13,00", category: "Pasta", tag: "Beliebt", image: asset("Innen2_623c7391.jpg") },
  { name: "Tagliatelle al Tartufo", description: "Trüffel-Pesto, Steinpilze, Knoblauch", price: "24,00", category: "Pasta", tag: "Speciale", image: asset("Innen1_b850898b.jpg") },
  { name: "Gnocchi Sorrentina", description: "Gnocchi, Tomaten, Basilikum, Mozzarella", price: "13,00", category: "Pasta", tag: "Vegetarisch", image: asset("Innen2_623c7391.jpg") },
  { name: "Insalata Verde", description: "Grüner Salat mit Joghurtdressing", price: "6,00", category: "Antipasti", tag: "Frisch", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Insalata Caprese", description: "Tomaten, Mozzarella, Basilikum, Balsamico", price: "10,00", category: "Antipasti", tag: "Vegetarisch", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Bruschetta", description: "Brot mit Tomaten, Basilikum, Knoblauch, Olivenöl, Rucola", price: "12,00", category: "Antipasti", tag: "Frisch", image: asset("Aussen_c58e6a71.jpg") },
  { name: "Antipasti Platte", description: "Grillgemüse, 2 Bruschetta, Tomaten-Mozzarella-Salat", price: "17,00", category: "Antipasti", tag: "Zum Teilen", image: asset("Innen1_b850898b.jpg") },
];

const categories = ["Alle", "Pizza", "Pinsa", "Pasta", "Antipasti"];

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
          <a className="nav-reserve" href="tel:+497825430">Jetzt anrufen <Phone size={15} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menü öffnen">
          {mobileMenu ? <X size={21} /> : <MenuIcon size={21} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Ristorante Pizzeria da Michele <span className="eyebrow-dot">✦</span></div>
          <h1>Italienisch, <i>warm</i><br />und direkt<br />auf dem Handy.</h1>
          <p className="hero-lede">Frisch zubereitete italienische Spezialitäten in Kippenheim — mit Abholung und einem Ambiente, das drinnen wie draußen in Erinnerung bleibt.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Speisekarte ansehen <ArrowRight size={16} /></button>
            <a className="text-link" href="tel:+497825430">Abholung bestellen <span>↗</span></a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">HEUTE GEÖFFNET</span><strong>17:00 — 21:30</strong></div>
            <div><span className="meta-label">KIPPENHEIM</span><strong>Poststraße 16</strong></div>
          </div>
        </div>
        <div className="hero-visual">
          <img src={asset("Innen1_b850898b.jpg")} alt="Innenbereich von Ristorante Pizzeria da Michele Kippenheim" />
          <div className="hero-image-shade" />
          <div className="hero-stamp"><span>DA MICHELE</span><strong>Fatto<br /><i>con</i><br />amore</strong></div>
          <div className="hero-caption"><span>01 / 03</span><span>Dentro & fuori, sempre con amore.</span></div>
        </div>
        <div className="scroll-note"><span /> SCROLL TO TASTE</div>
      </section>

      <section className="intro-strip" id="filosofia">
        <div className="intro-number">01</div>
          <div className="intro-title"><span>Unsere</span><strong>Tradizione</strong></div>
        <div className="intro-text">Frisch zubereitete Pizza, Pinsa, Pasta und Antipasti treffen auf italienische Gemütlichkeit. Im Innenbereich, auf der wunderschönen Terrasse oder einfach zur Abholung — bei uns soll es unkompliziert gut schmecken.</div>
        <div className="intro-signature">a tavola,<br /><span>in Kippenheim</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><span className="kicker">Pizza · Pinsa · Pasta</span><h2>Die Karte</h2></div>
          <p>Klassisch, herzhaft und direkt für die Abholung geeignet. Finde dein Gericht mit der Suche.</p>
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
        <div className="experience-image"><img src={asset("Aussen_c58e6a71.jpg")} alt="Terrasse und Außenbereich von Ristorante Pizzeria da Michele" /><div className="image-label"><span>02</span><strong>La tavola<br /><i>è pronta.</i></strong></div></div>
        <div className="experience-copy"><span className="kicker">Innen & Außen</span><h2>Schön sitzen.<br /><i>Gut essen.</i></h2><p>Die Terrasse mit Brunnen und geschützter Lage im Hof macht unser Restaurant im Sommer zu einem besonderen Ort für Familienessen und lange Gespräche.</p><div className="feature-list"><div><Star size={16} /><span>Wunderschöne Terrasse</span></div><div><Utensils size={16} /><span>Pizza, Pinsa, Pasta & Antipasti</span></div><div><Sparkles size={16} /><span>Abholung telefonisch möglich</span></div></div><a className="text-link dark-link" href="/restaurant">Mehr über uns <span>↗</span></a></div>
      </section>

      <section className="visit-section" id="visita">
        <div className="visit-left"><span className="kicker">Vieni a trovarci</span><h2>Bis bald<br /><i>bei uns.</i></h2><p>Poststraße 16<br />77971 Kippenheim</p><a className="button button-dark" href="tel:+497825430">Jetzt anrufen <Phone size={16} /></a></div>
        <div className="visit-right"><div className="hours-card"><div className="hours-title"><Clock3 size={18} /><span>Öffnungszeiten</span></div><div className="hours-row"><span>Montag — Sonntag</span><b>17:00 — 21:30</b></div></div><div className="contact-links"><a href="tel:+497825430"><Phone size={15} /> 07825 430</a><a href="mailto:bertoldo2300@gmail.com"><Instagram size={15} /> bertoldo2300@gmail.com</a><a href="https://maps.google.com/?q=Poststraße+16+77971+Kippenheim" target="_blank" rel="noreferrer"><MapPin size={15} /> Route planen <ArrowRight size={14} /></a></div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">DM</span><span>Ristorante Pizzeria da Michele</span></div><span>© 2026 Da Michele · Kippenheim</span><div className="footer-links"><a href="/restaurant">Restaurant</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/bedingungen">Bedingungen</a></div></footer>

      {reservationOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setReservationOpen(false); }}><div className="reservation-modal"><button className="modal-close" onClick={() => setReservationOpen(false)} aria-label="Reservierung schließen"><X /></button>{reserved ? <div className="reserved-state"><span className="success-mark">✓</span><span className="kicker">Perfetto</span><h2>Dein Tisch<br /><i>ist angefragt.</i></h2><p>Wir melden uns gleich bei dir mit der Bestätigung.</p><button className="button button-dark" onClick={() => setReservationOpen(false)}>Schließen</button></div> : <><span className="kicker">La tua serata</span><h2>Tisch<br /><i>reservieren.</i></h2><p className="modal-copy">Sag uns, wann du kommen möchtest — wir halten dir den besten Platz frei.</p><div className="reservation-fields"><label><span>Datum</span><div><CalendarDays size={16} /><input type="date" defaultValue="2024-06-21" /></div></label><label><span>Uhrzeit</span><div><Clock3 size={16} /><select defaultValue="19:30"><option>18:30</option><option>19:30</option><option>20:30</option><option>21:00</option></select><ChevronDown size={15} /></div></label><label><span>Gäste</span><div><Utensils size={16} /><select defaultValue="2 Personen"><option>2 Personen</option><option>3 Personen</option><option>4 Personen</option><option>5+ Personen</option></select><ChevronDown size={15} /></div></label></div><button className="button button-dark full-button" onClick={() => setReserved(true)}>Anfrage senden <ArrowRight size={16} /></button></>}</div></div>}
    </main>
  );
}

// React.CSSProperties is used for the stagger custom property above.
