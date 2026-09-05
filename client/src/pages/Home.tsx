import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { MapView } from "@/components/Map";
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
  { name: "Pizza Pane", description: "Pizzabrot, frisch aus dem Ofen", price: "5,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Margherita", description: "Tomatensoße, Mozzarella", price: "10,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Salami", description: "Tomatensoße, Salami, Mozzarella", price: "12,00", category: "Pizza", tag: "Beliebt", image: asset("italian-table_c93f51db.webp") },
  { name: "Paesana", description: "Schinken, Salami, Champignons, Mozzarella", price: "14,50", category: "Pizza", tag: "Hausfavorit", image: asset("pizza_070a5566.jpg") },
  { name: "Capricciosa", description: "Schinken, Champignons, Zwiebeln, Artischocken, Mozzarella", price: "15,00", category: "Pizza", tag: "Klassiker", image: asset("italian-table_c93f51db.webp") },
  { name: "Diavolo", description: "Wurst, Ei, Zwiebeln, Paprika, Peperoni, Mozzarella", price: "16,00", category: "Pizza", tag: "Piccante", image: asset("pizza_070a5566.jpg") },
  { name: "Alla Casa", description: "Tomatenstückchen, Rucola, Parmaschinken, Mozzarella", price: "18,00", category: "Pizza", tag: "Della casa", image: asset("italian-table_c93f51db.webp") },
  { name: "Speciale al Burrata", description: "Tomatensoße, Mozzarella, Burrata, Rucola, Cherrytomate", price: "18,00", category: "Pizza", tag: "Speciale", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Ai Frutti di Mare", description: "Meeresfrüchte, Gambas, Mozzarella", price: "20,00", category: "Pizza", tag: "Mare", image: asset("pizza_070a5566.jpg") },
  { name: "Pinsa Sicilia", description: "Thunfisch, Sardellen, Oliven, Mozzarella", price: "15,00", category: "Pinsa", tag: "Pinsa", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pinsa Vegetariana", description: "Paprika, Artischocke, Cocktailtomaten, Spinat, Oliven, Zwiebeln", price: "15,00", category: "Pinsa", tag: "Vegetarisch", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pinsa Campana", description: "Steinpilze, Büffelmozzarella", price: "15,00", category: "Pinsa", tag: "Pinsa", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Spaghetti Aglio Olio", description: "Olivenöl, Knoblauch, Peperoni", price: "10,00", category: "Pasta", tag: "Klassiker", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Spaghetti Bolognese", description: "Mit Bolognese-Soße", price: "12,00", category: "Pasta", tag: "Klassiker", image: asset("italian-table_c93f51db.webp") },
  { name: "Spaghetti Carbonara", description: "Speck, Ei, Parmesan", price: "13,00", category: "Pasta", tag: "Beliebt", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Tagliatelle al Tartufo", description: "Trüffel-Pesto, Steinpilze, Knoblauch", price: "24,00", category: "Pasta", tag: "Speciale", image: asset("italian-table_c93f51db.webp") },
  { name: "Gnocchi Sorrentina", description: "Gnocchi, Tomaten, Basilikum, Mozzarella", price: "13,00", category: "Pasta", tag: "Vegetarisch", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Insalata Verde", description: "Grüner Salat mit Joghurtdressing", price: "6,00", category: "Antipasti", tag: "Frisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Insalata Caprese", description: "Tomaten, Mozzarella, Basilikum, Balsamico", price: "10,00", category: "Antipasti", tag: "Vegetarisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Bruschetta", description: "Brot mit Tomaten, Basilikum, Knoblauch, Olivenöl, Rucola", price: "12,00", category: "Antipasti", tag: "Frisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Antipasti Platte", description: "Grillgemüse, 2 Bruschetta, Tomaten-Mozzarella-Salat", price: "17,00", category: "Antipasti", tag: "Zum Teilen", image: asset("italian-table_c93f51db.webp") },
];

const categories = ["Alle", "Pizza", "Pinsa", "Pasta", "Antipasti"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [query, setQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reserved, setReserved] = useState(false);

  const filteredDishes = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return dishes.filter((dish) => {
      const matchesCategory = activeCategory === "Alle" || dish.category === activeCategory;
      const matchesQuery = !normalized || `${dish.name} ${dish.description} ${dish.category} ${dish.tag}`.toLowerCase().includes(normalized);
      const matchesDiet = !vegetarianOnly || dish.tag === "Vegetarisch";
      return matchesCategory && matchesQuery && matchesDiet;
    });
  }, [activeCategory, query, vegetarianOnly]);

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
          <div className="menu-controls"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Gericht oder Zutat suchen …" aria-label="Gericht oder Zutat suchen" />{query && <button onClick={() => setQuery("")} aria-label="Suche löschen"><X size={15} /></button>}</label><button className={vegetarianOnly ? "diet-filter active" : "diet-filter"} onClick={() => setVegetarianOnly(!vegetarianOnly)}><span>✦</span> Vegetarisch</button></div>
        </div>
        <div className="dish-grid">
          {filteredDishes.map((dish, index) => (
            <article className="dish-card" key={dish.name} style={{ "--delay": `${index * 45}ms` } as CSSProperties}>
              <div className="dish-photo"><img src={dish.image} alt={dish.name} /><span className="dish-tag">{dish.tag}</span><button className="dish-arrow" aria-label={`${dish.name} auswählen`} onClick={() => setQuery(dish.name)}>↗</button></div>
              <div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><span className="dish-price">{dish.price} <small>€</small></span></div>
            </article>
          ))}
        </div>
        {filteredDishes.length === 0 && <div className="empty-state"><Sparkles size={18} /><strong>Nichts gefunden.</strong><span>Probier „Pasta“, „Pizza“, „Mozzarella“ oder setze den Filter zurück.</span></div>}
        <div className="menu-footer"><span>{filteredDishes.length} Gerichte gefunden · Alle Preise in Euro</span><button className="button button-dark" onClick={() => { setActiveCategory("Alle"); setQuery(""); setVegetarianOnly(false); }}>Filter zurücksetzen <ArrowRight size={16} /></button></div>
      </section>

      <section className="experience-section">
        <div className="experience-image"><img src={asset("Aussen_c58e6a71.jpg")} alt="Terrasse und Außenbereich von Ristorante Pizzeria da Michele" /><div className="image-label"><span>02</span><strong>La tavola<br /><i>è pronta.</i></strong></div></div>
        <div className="experience-copy"><span className="kicker">Innen & Außen</span><h2>Schön sitzen.<br /><i>Gut essen.</i></h2><p>Die Terrasse mit Brunnen und geschützter Lage im Hof macht unser Restaurant im Sommer zu einem besonderen Ort für Familienessen und lange Gespräche.</p><div className="feature-list"><div><Star size={16} /><span>Wunderschöne Terrasse</span></div><div><Utensils size={16} /><span>Pizza, Pinsa, Pasta & Antipasti</span></div><div><Sparkles size={16} /><span>Abholung telefonisch möglich</span></div></div><a className="text-link dark-link" href="/restaurant">Mehr über uns <span>↗</span></a></div>
      </section>

      <section className="gallery-section" id="galerie">
        <div className="gallery-heading"><div><span className="kicker">Dentro & fuori</span><h2>Einblicke<br /><i>bei uns.</i></h2></div><p>Ein warmer Gastraum, ein zweiter Blick auf die Bar und unsere Terrasse im Hof — entdecke Da Michele, bevor du kommst.</p></div>
        <div className="gallery-grid"><figure className="gallery-item gallery-large"><img src={asset("Innen1_b850898b.jpg")} alt="Angenehmes Ambiente im Innenbereich" /><figcaption><span>01</span> La sala</figcaption></figure><figure className="gallery-item"><img src={asset("Innen2_623c7391.jpg")} alt="Bar und Tische im zweiten Innenraum" /><figcaption><span>02</span> Il bar</figcaption></figure><figure className="gallery-item gallery-tall"><img src={asset("Aussen_c58e6a71.jpg")} alt="Terrasse und Außenbereich" /><figcaption><span>03</span> La terrazza</figcaption></figure></div>
      </section>

      <section className="visit-section" id="visita">
        <div className="visit-left"><span className="kicker">Vieni a trovarci</span><h2>Bis bald<br /><i>bei uns.</i></h2><p>Poststraße 16<br />77971 Kippenheim</p><a className="button button-dark" href="tel:+497825430">Jetzt anrufen <Phone size={16} /></a></div>
        <div className="visit-right"><div className="hours-card"><div className="hours-title"><Clock3 size={18} /><span>Öffnungszeiten</span></div><div className="hours-row"><span>Montag — Sonntag</span><b>17:00 — 21:30</b></div></div><div className="contact-links"><a href="tel:+497825430"><Phone size={15} /> 07825 430</a><a href="mailto:bertoldo2300@gmail.com"><Instagram size={15} /> bertoldo2300@gmail.com</a><a href="https://maps.google.com/?q=Poststraße+16+77971+Kippenheim" target="_blank" rel="noreferrer"><MapPin size={15} /> Route planen <ArrowRight size={14} /></a></div><div className="map-card"><div className="map-overlay"><span className="map-pin"><MapPin size={16} /></span><div><strong>Ristorante Pizzeria da Michele</strong><small>Poststraße 16 · Kippenheim</small></div></div><MapView className="restaurant-map" initialCenter={{ lat: 48.3015, lng: 7.8205 }} initialZoom={16} onMapReady={(map) => { new google.maps.marker.AdvancedMarkerElement({ map, position: { lat: 48.3015, lng: 7.8205 }, title: "Ristorante Pizzeria da Michele" }); }} /></div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">DM</span><span>Ristorante Pizzeria da Michele</span></div><span>© 2026 Da Michele · Kippenheim</span><div className="footer-links"><a href="/restaurant">Restaurant</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/bedingungen">Bedingungen</a></div></footer>

      {reservationOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setReservationOpen(false); }}><div className="reservation-modal"><button className="modal-close" onClick={() => setReservationOpen(false)} aria-label="Reservierung schließen"><X /></button>{reserved ? <div className="reserved-state"><span className="success-mark">✓</span><span className="kicker">Perfetto</span><h2>Dein Tisch<br /><i>ist angefragt.</i></h2><p>Wir melden uns gleich bei dir mit der Bestätigung.</p><button className="button button-dark" onClick={() => setReservationOpen(false)}>Schließen</button></div> : <><span className="kicker">La tua serata</span><h2>Tisch<br /><i>reservieren.</i></h2><p className="modal-copy">Sag uns, wann du kommen möchtest — wir halten dir den besten Platz frei.</p><div className="reservation-fields"><label><span>Datum</span><div><CalendarDays size={16} /><input type="date" defaultValue="2024-06-21" /></div></label><label><span>Uhrzeit</span><div><Clock3 size={16} /><select defaultValue="19:30"><option>18:30</option><option>19:30</option><option>20:30</option><option>21:00</option></select><ChevronDown size={15} /></div></label><label><span>Gäste</span><div><Utensils size={16} /><select defaultValue="2 Personen"><option>2 Personen</option><option>3 Personen</option><option>4 Personen</option><option>5+ Personen</option></select><ChevronDown size={15} /></div></label></div><button className="button button-dark full-button" onClick={() => setReserved(true)}>Anfrage senden <ArrowRight size={16} /></button></>}</div></div>}
    </main>
  );
}

// React.CSSProperties is used for the stagger custom property above.
