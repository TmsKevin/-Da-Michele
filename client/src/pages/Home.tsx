import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Flame,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Pizza as PizzaIcon,
  Salad,
  Search,
  Sparkles,
  Star,
  Utensils,
  Wheat,
  X,
} from "lucide-react";

const asset = (name: string) => {
  const localAssets: Record<string, string> = {
    "Innen1_b850898b.jpg": "Innen1.jpg",
    "Innen2_623c7391.jpg": "Innen2.jpg",
    "Aussen_c58e6a71.jpg": "Aussen.jpg",
    "pizza_070a5566.jpg": "pizza.jpg",
    "italian-table_c93f51db.webp": "italian-table.webp",
    "burrata-pasta_089f37dc.jpg": "burrata-pasta.jpg",
    "caprese_1a6ebdc6.webp": "caprese.webp",
    "pinsa-burrata_a2ceab06.jpg": "pinsa-burrata.jpg",
  };
  const base = import.meta.env.DEV ? "https://pizzeria-da-michele-kippenheim.netlify.app" : "";
  return `${base}/assets/${localAssets[name] ?? name}`;
};

const dishes = [
  { name: "Insalata Verde", description: "Grüner Salat mit Joghurtdressing", price: "6,00", category: "Antipasti", tag: "Frisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Insalata Mista", description: "Gemischter Salat mit Joghurtdressing", price: "8,00", category: "Antipasti", tag: "Frisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Insalata Caprese", description: "Tomaten, Mozzarella, Basilikum, Balsamicoessig, Olivenöl", price: "10,00", category: "Antipasti", tag: "Vegetarisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Bruschetta", description: "Brot mit Tomaten, Basilikum, Knoblauch, Olivenöl, Rucola", price: "12,00", category: "Antipasti", tag: "Frisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Antipasti per Due", description: "Vorspeisen für 2 Personen", price: "14,00", category: "Antipasti", tag: "Zum Teilen", image: asset("italian-table_c93f51db.webp") },
  { name: "Insalata Italia", description: "Salate, Tomaten, Vorderschinken, Käse und Ei", price: "15,00", category: "Antipasti", tag: "Beliebt", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Insalata Tacchino", description: "Gemischte Salate mit gebratenen Putenstreifen, Essig-Öl-Dressing", price: "16,00", category: "Antipasti", tag: "Frisch", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Insalata al Salmone", description: "Gemischte Salate mit gebratenem Lachsfilet, Essig-Öl-Dressing", price: "18,00", category: "Antipasti", tag: "Mare", image: asset("caprese_1a6ebdc6.webp") },
  { name: "Antipasti Platte", description: "Grillgemüse, 2 Bruschetta, Tomaten-Mozzarella-Salat", price: "18,00", category: "Antipasti", tag: "Zum Teilen", image: asset("italian-table_c93f51db.webp") },
  { name: "Spaghetti Aglio Olio", description: "Spaghetti, Olivenöl, Knoblauch, Peperoni", price: "10,00", category: "Pasta", tag: "Klassiker", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Spaghetti Bolognese", description: "Spaghetti mit Bolognesesoße", price: "12,00", category: "Pasta", tag: "Klassiker", image: asset("italian-table_c93f51db.webp") },
  { name: "Spaghetti Carbonara", description: "Spaghetti, Speck, Ei, Parmesan", price: "13,00", category: "Pasta", tag: "Beliebt", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Spaghetti Frutti di Mare", description: "Tomatensoße mit Gambas und Meeresfrüchten", price: "19,00", category: "Pasta", tag: "Mare", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Tagliatelle al Zaferano", description: "Safransoße, Steinpilze, Pinienkerne", price: "17,00", category: "Pasta", tag: "Speciale", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Tagliatelle al Salmone", description: "Lachs, Weißwein, Sahnesoße", price: "18,00", category: "Pasta", tag: "Mare", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Tagliatelle al Tartufo", description: "Trüffel-Pesto, Steinpilze, Knoblauch", price: "24,00", category: "Pasta", tag: "Speciale", image: asset("italian-table_c93f51db.webp") },
  { name: "Penne Arrabiata", description: "Penne, Tomatensoße, Peperoni", price: "12,00", category: "Pasta", tag: "Piccante", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Penne Emiliana", description: "Bolognese-Sahnesoße, Schinken, Erbsen", price: "14,00", category: "Pasta", tag: "Hausfavorit", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Penne Piemontese", description: "Sahnesoße, Putenstreifen, Pilze", price: "16,00", category: "Pasta", tag: "Beliebt", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Tortellini alla Panna", description: "Tortellini, Schinken, Sahnesoße", price: "13,00", category: "Pasta", tag: "Klassiker", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Gnocchi Sorrentina", description: "Gnocchi, Tomaten, Basilikum, Mozzarella", price: "13,00", category: "Pasta", tag: "Vegetarisch", image: asset("burrata-pasta_089f37dc.jpg") },
  { name: "Lasagna", description: "Nudelteig mit Tomaten-Hackfleischsoße, mit Käse überbacken", price: "14,00", category: "Al Forno", tag: "Ofengericht", image: asset("italian-table_c93f51db.webp") },
  { name: "Pinsa Sicilia", description: "Tomatensoße, Thunfisch, Sardellen, Oliven, Mozzarella", price: "15,00", category: "Pinsa", tag: "Mare", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pinsa Campana", description: "Tomatensoße, Steinpilze, Büffelmozzarella", price: "15,00", category: "Pinsa", tag: "Pinsa", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pinsa Vegetariana", description: "Paprika, Artischocke, Cocktailtomaten, Spinat, Oliven, Zwiebeln, Mozzarella", price: "15,00", category: "Pinsa", tag: "Vegetarisch", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pinsa Tirol", description: "Tomatensoße, Steinpilze, Speck, Mozzarella", price: "15,00", category: "Pinsa", tag: "Pinsa", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pinsa Lucana", description: "Tomatensoße, Zwiebeln, Peperoni, Oliven, Salsiccia, Mozzarella", price: "15,00", category: "Pinsa", tag: "Piccante", image: asset("pinsa-burrata_a2ceab06.jpg") },
  { name: "Pizza Pane", description: "Pizzabrot", price: "5,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Margherita", description: "Tomatensoße, Mozzarella", price: "10,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Salami", description: "Tomatensoße, Salami, Mozzarella", price: "12,00", category: "Pizza", tag: "Beliebt", image: asset("italian-table_c93f51db.webp") },
  { name: "Prosciutto", description: "Tomatensoße, Schinken, Mozzarella", price: "12,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Hawaii", description: "Tomatensoße, Schinken, Ananas, Mozzarella", price: "13,00", category: "Pizza", tag: "Beliebt", image: asset("pizza_070a5566.jpg") },
  { name: "Paesana", description: "Schinken, Salami, Champignons, Mozzarella", price: "14,00", category: "Pizza", tag: "Hausfavorit", image: asset("pizza_070a5566.jpg") },
  { name: "Napoletana", description: "Tomatensoße, Oliven, Kapern, Sardellen, Mozzarella", price: "14,00", category: "Pizza", tag: "Mare", image: asset("pizza_070a5566.jpg") },
  { name: "Casalinga", description: "Tomatensoße, Salami, Zwiebeln, Champignons, Mozzarella", price: "14,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Capricciosa", description: "Schinken, Champignons, Zwiebeln, Artischocken, Mozzarella", price: "15,00", category: "Pizza", tag: "Klassiker", image: asset("italian-table_c93f51db.webp") },
  { name: "Quattro Stagioni", description: "Artischocken, Schinken, Champignons, Paprika, Mozzarella", price: "15,00", category: "Pizza", tag: "Klassiker", image: asset("pizza_070a5566.jpg") },
  { name: "Foresta Nera", description: "Speck, Champignons, Paprika, Zwiebeln, Mozzarella", price: "16,00", category: "Pizza", tag: "Hausfavorit", image: asset("pizza_070a5566.jpg") },
  { name: "Diavolo", description: "Wurst, Ei, Zwiebeln, Paprika, Peperoni, Mozzarella", price: "16,00", category: "Pizza", tag: "Piccante", image: asset("pizza_070a5566.jpg") },
  { name: "Basilicata", description: "Mascarpone, Zwiebeln, Knoblauch, Vorderschinken, Peperoni, Mozzarella", price: "17,00", category: "Pizza", tag: "Speciale", image: asset("pizza_070a5566.jpg") },
  { name: "Calzone Rustico", description: "Tomatensoße, Schinken, Ei, Salami, Champignons, Mozzarella", price: "17,00", category: "Pizza", tag: "Ofengericht", image: asset("pizza_070a5566.jpg") },
  { name: "Mare e Monti", description: "Thunfisch, Kapern, Sardellen, Oliven, Mozzarella", price: "18,00", category: "Pizza", tag: "Mare", image: asset("pizza_070a5566.jpg") },
  { name: "Alla Casa", description: "Tomatenstückchen, Rucola, Parmaschinken, Mozzarella", price: "18,00", category: "Pizza", tag: "Della casa", image: asset("italian-table_c93f51db.webp") },
  { name: "Alla Pescatore", description: "Garnelen, Lachs, Spinat, Mozzarella", price: "19,00", category: "Pizza", tag: "Mare", image: asset("pizza_070a5566.jpg") },
  { name: "Al Frutti di Mare", description: "Meeresfrüchte, Gambas, Mozzarella", price: "20,00", category: "Pizza", tag: "Mare", image: asset("pizza_070a5566.jpg") },
  { name: "Speciale al Salsiccia", description: "Tomatensoße, Mozzarella, Salsiccia, karamellisierte Zwiebeln, Chiliflocken", price: "15,00", category: "Pizza", tag: "Speciale", image: asset("pizza_070a5566.jpg") },
  { name: "Speciale al Burrata", description: "Tomatensoße, Mozzarella, Burrata, Rucola, Cherrytomate, Granatapfel", price: "18,00", category: "Pizza", tag: "Speciale", image: asset("pinsa-burrata_a2ceab06.jpg") },
];

const categories = ["Alle", "Pizza", "Pinsa", "Pasta", "Antipasti", "Al Forno"];
const categoryIcons = { Alle: Sparkles, Pizza: PizzaIcon, Pinsa: Wheat, Pasta: Utensils, Antipasti: Salad, "Al Forno": Flame };
const heroSlides = [
  { image: "Innen1_b850898b.jpg", label: "La sala", alt: "Innenbereich von Ristorante Pizzeria da Michele Kippenheim" },
  { image: "Aussen_c58e6a71.jpg", label: "La terrazza", alt: "Terrasse von Ristorante Pizzeria da Michele Kippenheim" },
  { image: "Innen2_623c7391.jpg", label: "Il bar", alt: "Bar und zweiter Innenraum von Ristorante Pizzeria da Michele Kippenheim" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [query, setQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
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

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 5600);
    return () => window.clearInterval(timer);
  }, []);

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
          <a className="nav-reserve" href="tel:+491607917252">Jetzt anrufen <Phone size={15} /></a>
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
            <a className="text-link" href="tel:+491607917252">Abholung bestellen <span>↗</span></a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">HEUTE GEÖFFNET</span><strong>17:00 — 21:30</strong></div>
            <div><span className="meta-label">KIPPENHEIM</span><strong>Poststraße 16</strong></div>
          </div>
          <div className="hero-side-note">PIZZA · PINSA · PASTA · AMORE</div>
        </div>
        <div className="hero-visual">
          <img key={heroSlides[heroSlide].image} src={asset(heroSlides[heroSlide].image)} alt={heroSlides[heroSlide].alt} />
          <div className="hero-image-shade" />
          <div className="hero-frame" aria-hidden="true" />
          <div className="hero-orbit"><span>FRESH<br />EVERY DAY</span><i>✦</i><strong>DA<br /><em>MICHELE</em></strong></div>
          <div className="hero-stamp"><span>DA MICHELE</span><strong>Fatto<br /><i>con</i><br />amore</strong></div>
          <div className="hero-caption"><span>0{heroSlide + 1} / 03</span><span>{heroSlides[heroSlide].label} · sempre con amore.</span></div>
          <div className="hero-controls" aria-label="Hero-Bilder wechseln">{heroSlides.map((slide, index) => <button key={slide.image} className={heroSlide === index ? "hero-dot active" : "hero-dot"} onClick={() => setHeroSlide(index)} aria-label={`${slide.label} anzeigen`}><span /></button>)}</div>
        </div>
        <div className="scroll-note"><span /> SCROLL TO TASTE</div>
      </section>

      <div className="marquee-strip" aria-label="Ristorante Pizzeria da Michele"><div><span>LA TAVOLA</span><b>✦</b><span>LA FAMIGLIA</span><b>✦</b><span>LA PIZZA</span><b>✦</b><span>IL SAPORE</span><b>✦</b><span>LA TAVOLA</span><b>✦</b><span>LA FAMIGLIA</span><b>✦</b></div></div>

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
            {categories.map((category) => { const Icon = categoryIcons[category as keyof typeof categoryIcons]; return <button key={category} className={activeCategory === category ? "category-tab active" : "category-tab"} onClick={() => setActiveCategory(category)}><Icon size={15} strokeWidth={1.7} />{category}</button>; })}
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
        <div className="visit-left"><span className="kicker">Vieni a trovarci</span><h2>Bis bald<br /><i>bei uns.</i></h2><p>Poststraße 16<br />77971 Kippenheim</p><a className="button button-dark" href="tel:+491607917252">Jetzt anrufen <Phone size={16} /></a></div>
        <div className="visit-right"><div className="hours-card"><div className="hours-title"><Clock3 size={18} /><span>Öffnungszeiten</span></div><div className="hours-row"><span>Montag — Sonntag</span><b>17:00 — 21:30</b></div></div><div className="contact-links"><a href="tel:+491607917252"><Phone size={15} /> 0160 7917252</a><a href="mailto:bertoldo2300@gmail.com"><Instagram size={15} /> bertoldo2300@gmail.com</a><a href="https://maps.google.com/?q=Poststraße+16+77971+Kippenheim" target="_blank" rel="noreferrer"><MapPin size={15} /> Route planen <ArrowRight size={14} /></a></div><div className="map-card"><div className="map-overlay"><span className="map-pin"><MapPin size={16} /></span><div><strong>Ristorante Pizzeria da Michele</strong><small>Poststraße 16 · Kippenheim</small></div></div><iframe className="restaurant-map" title="Standort von Ristorante Pizzeria da Michele in Kippenheim" src="https://www.google.com/maps?q=Poststra%C3%9Fe+16%2C+77971+Kippenheim&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">DM</span><span>Ristorante Pizzeria da Michele</span></div><span>© 2026 Da Michele · Kippenheim</span><div className="footer-links"><a href="/restaurant">Restaurant</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/bedingungen">Bedingungen</a></div></footer>

      {reservationOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setReservationOpen(false); }}><div className="reservation-modal"><button className="modal-close" onClick={() => setReservationOpen(false)} aria-label="Reservierung schließen"><X /></button>{reserved ? <div className="reserved-state"><span className="success-mark">✓</span><span className="kicker">Perfetto</span><h2>Dein Tisch<br /><i>ist angefragt.</i></h2><p>Wir melden uns gleich bei dir mit der Bestätigung.</p><button className="button button-dark" onClick={() => setReservationOpen(false)}>Schließen</button></div> : <><span className="kicker">La tua serata</span><h2>Tisch<br /><i>reservieren.</i></h2><p className="modal-copy">Sag uns, wann du kommen möchtest — wir halten dir den besten Platz frei.</p><div className="reservation-fields"><label><span>Datum</span><div><CalendarDays size={16} /><input type="date" defaultValue="2024-06-21" /></div></label><label><span>Uhrzeit</span><div><Clock3 size={16} /><select defaultValue="19:30"><option>18:30</option><option>19:30</option><option>20:30</option><option>21:00</option></select><ChevronDown size={15} /></div></label><label><span>Gäste</span><div><Utensils size={16} /><select defaultValue="2 Personen"><option>2 Personen</option><option>3 Personen</option><option>4 Personen</option><option>5+ Personen</option></select><ChevronDown size={15} /></div></label></div><button className="button button-dark full-button" onClick={() => setReserved(true)}>Anfrage senden <ArrowRight size={16} /></button></>}</div></div>}
    </main>
  );
}

// React.CSSProperties is used for the stagger custom property above.
