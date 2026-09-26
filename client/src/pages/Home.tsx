import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
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
  X,
} from "lucide-react";

const asset = (name: string) => {
  const base = import.meta.env.DEV ? "https://pizzeria-da-michele-kippenheim.netlify.app" : "";
  return `${base}/assets/${name}`;
};

type Dish = { name: string; description: string; price: string; category: string; tag: string };
const menuItem = (name: string, description: string, price: string, category: string, tag = category) => ({ name, description, price, category, tag });

const dishes: Dish[] = [
  menuItem("BRUSCHETTA", "Brot mit Tomaten, Basilikum, Knoblauch, Olivenöl, Rucola", "12,00", "Salate / Antipaste", "Vorspeise"),
  menuItem("INSALATA VERDE", "Grüner Salat mit Joghurtdressing", "6,00", "Salate / Antipaste", "Salat"),
  menuItem("INSALATA MISTA", "Gemischter Salat mit Joghurt-Dressing", "8,00", "Salate / Antipaste", "Salat"),
  menuItem("INSALATA CAPRESE", "Tomaten, Mozzarella, Basilikum, Essig, Olivenöl", "10,00", "Salate / Antipaste", "Vegetarisch"),
  menuItem("RUCCOLA CON BURRATA", "Burrata auf Rucola mit Parmesansplitter, Cocktail-Tomaten, Essig, Olivenöl und Balsamico-Creme", "14,00", "Salate / Antipaste", "Vegetarisch"),
  menuItem("INSALATA ITALIA", "Gemischter Salat, Tomaten, Vorderschinken, Käse, Ei", "15,00", "Salate / Antipaste", "Salat"),
  menuItem("GAMBERI ALL'AGLIO", "4× Riesengarnelen in Knoblauchsoße", "15,00", "Salate / Antipaste", "Mare"),
  menuItem("INSALATA TACCHINO", "Gemischter Salat, gebratene Putenstreifen, Essig, Olivenöl", "16,00", "Salate / Antipaste", "Salat"),
  menuItem("INSALATA AL SALMONE", "Gemischter Salat mit gebratenem Lachsfilet, Essig, Olivenöl", "16,00", "Salate / Antipaste", "Mare"),
  menuItem("INSALATA DI MARE", "Meeresfrüchte-Salat", "17,00", "Salate / Antipaste", "Mare"),
  menuItem("ANTIPASTI PLATTE", "Verschiedene Grillgemüse, 2 Bruschetta, Tomaten-Mozzarella-Salat", "18,00", "Salate / Antipaste", "Vorspeise"),

  menuItem("PIZZA PANE", "Pizzabrot", "5,00", "Pizza", "Klassiker"),
  menuItem("MARGHERITA", "Tomatensoße, Mozzarella", "10,00", "Pizza", "Vegetarisch"),
  menuItem("SALAMI", "Tomatensoße, Mozzarella, Rindersalami (mit Pflanzenfett und Putenfleisch)", "12,00", "Pizza"),
  menuItem("PROSCIUTTO", "Tomatensoße, Mozzarella, Schinken", "12,00", "Pizza"),
  menuItem("HAWAII", "Tomatensoße, Mozzarella, Schinken, Ananas", "14,00", "Pizza"),
  menuItem("PAESANA", "Tomatensoße, Mozzarella, Schinken, Rindersalami, Champignons", "14,50", "Pizza"),
  menuItem("NAPOLETANA", "Tomatensoße, Mozzarella, Oliven, Kapern, Sardellen", "14,50", "Pizza", "Mare"),
  menuItem("CASALINGA", "Tomatensoße, Mozzarella, Rindersalami, Zwiebeln, Champignons", "14,50", "Pizza"),
  menuItem("CAPRICCIOSA", "Tomatensoße, Mozzarella, Schinken, Champignons, Zwiebeln, Artischocken", "15,00", "Pizza"),
  menuItem("QUATTRO STAGIONI", "Tomatensoße, Mozzarella, Artischocken, Schinken, Champignons, Paprika", "15,00", "Pizza"),
  menuItem("FORESTA NERA", "Tomatensoße, Mozzarella, Speck, Champignons, Paprika, Zwiebeln", "15,00", "Pizza"),
  menuItem("AL SALSICCIA", "Tomatensoße, Mozzarella, scharfe Salami, Zwiebeln, Champignons", "15,00", "Pizza", "Scharf"),
  menuItem("4 FORMAGGI", "Weiße Pizza mit 4 verschiedenen Käsesorten", "15,00", "Pizza", "Vegetarisch"),
  menuItem("VEGETARISCH", "Zwiebel, Paprika, Oliven, Spinat und Artischocken", "15,00", "Pizza", "Vegetarisch"),
  menuItem("LUCANA", "Oliven, Peperoni, Zwiebel und scharfe Salami", "15,00", "Pizza", "Scharf"),
  menuItem("CALZONE RUSTICO", "Tomatensoße, Mozzarella, Schinken, Ei, Salami, Champignons", "15,00", "Pizza"),
  menuItem("DIAVOLO", "Tomatensoße, Mozzarella, scharfe Salami, Ei, Paprika, Peperoni, Zwiebeln", "16,00", "Pizza", "Scharf"),
  menuItem("BASILICATA", "Tomatensoße, Mozzarella, Mascarpone, Zwiebeln, Knoblauch, Schinken, Peperoni", "16,00", "Pizza"),
  menuItem("MARE E MONTI", "Tomatensoße, Mozzarella, Zwiebeln, Thunfisch, Kapern, Sardellen, Oliven", "16,00", "Pizza", "Mare"),
  menuItem("ALL' MORTADELLA", "Weiße Pizza mit Mortadella, Burrata und Pistazien", "17,00", "Pizza"),
  menuItem("AL BURRATA", "Tomatensoße, Mozzarella, Burrata, Rucola, Cherrytomaten, Granatapfel", "18,00", "Pizza", "Vegetarisch"),
  menuItem("ALLA CASA", "Tomatensoße, Mozzarella, Rucola, Parmaschinken, Cocktailtomaten, Parmesansplitter", "18,00", "Pizza"),
  menuItem("ALLA PESCATORE", "Tomatensoße, Mozzarella, Shrimps, Lachs, Spinat", "19,00", "Pizza", "Mare"),
  menuItem("AI FRUTTI DI MARE", "Tomatensoße, Mozzarella, Meeresfrüchte, Gambas", "20,00", "Pizza", "Mare"),

  menuItem("SPAGHETTI AGLIO E OLIO", "Olivenöl, Knoblauch, Peperoni (scharf)", "10,00", "Pasta", "Vegetarisch"),
  menuItem("SPAGHETTI BOLOGNESE", "Mit Bolognesesoße", "12,00", "Pasta"),
  menuItem("PENNE ARRABIATA", "Mit Tomatensoße, Peperoni (scharf)", "12,00", "Pasta", "Scharf"),
  menuItem("SPAGHETTI CARBONARA", "Speck, Ei, Parmesan, Sahnesoße", "13,00", "Pasta"),
  menuItem("TORTELLINI ALLA PANNA", "Gefüllt mit Schinken, Sahnesoße", "13,00", "Pasta"),
  menuItem("GNOCCHI SORENTINA", "Tomaten, Basilikum, Mozzarella", "13,00", "Pasta", "Vegetarisch"),
  menuItem("PENNE EMILIANA", "Bolognese-Sahnesoße, Schinken, Erbsen", "14,00", "Pasta"),
  menuItem("RIGATONI ALL' FORNO", "Überbacken mit Schinken, Champignons, Erbsen und Tomaten-Sahnesoße", "15,00", "Pasta"),
  menuItem("RIGATONI ALL' GORGONZOLA", "Gorgonzola, Walnüsse, Spinat und Sahnesoße", "15,00", "Pasta"),
  menuItem("TORTELLINI ALL' FUNGHI", "Gefüllt mit Schinken, Pilzen, Sahnesoße und Weißwein", "13,00", "Pasta"),
  menuItem("GNOCCHI AI 4 FORMAGGI", "4 verschiedene Käsesorten und Spinat", "14,50", "Pasta", "Vegetarisch"),
  menuItem("RIGATONI ALL' AMATRICIANA", "Guanciale, Cocktailtomaten, Pecorino-Käse und Weißwein", "16,00", "Pasta"),
  menuItem("PENNE PIEMONTESE", "Sahnesoße, Putenstreifen, Pilze", "16,00", "Pasta"),
  menuItem("TAGLIATELLE AL ZAFFERANO", "Safransoße, Steinpilze, Pinienkerne", "17,00", "Pasta", "Vegetarisch"),
  menuItem("TAGLIATELLE AL SALMONE", "Lachs, Sahnesoße, Zwiebeln", "18,00", "Pasta", "Mare"),
  menuItem("SPAGHETTI FRUTTI DI MARE", "Tomatensoße mit Gambas und Meeresfrüchten", "19,00", "Pasta", "Mare"),
  menuItem("PICCATA MILANESE", "Schweineschnitzel mit Parmesan-Ei-Mantel, Spaghetti, Tomatensoße, Salat", "20,00", "Pasta"),
  menuItem("PACCHERI ALL' COZZE", "Muscheln, Cocktailtomaten, Knoblauch und Weißwein", "22,00", "Pasta", "Mare"),
  menuItem("PACCHERI ALL' CALAMARI", "Geschnittener Tintenfisch, Cocktailtomaten, Knoblauch und Weißwein", "24,00", "Pasta", "Mare"),
  menuItem("TAGLIATELLE AL TARTUFO", "Mit Trüffel", "24,00", "Pasta", "Vegetarisch"),
  menuItem("LASAGNE", "Tomatensoße, Hackfleisch, Käse, überbacken", "14,00", "Pasta"),

  menuItem("RIESENGARNELEN", "Mit Knoblauchspaghetti", "29,00", "Pesce / Fischgerichte", "Mare"),
  menuItem("CALAMARI ALLA GRIGLIA", "Gegrillter Tintenfisch mit Knoblauchspaghetti und Salat", "30,00", "Pesce / Fischgerichte", "Mare"),
  menuItem("OKTOPUS ALLA GRIGLIA", "Gegrillter Oktopus mit Knoblauchspaghetti, Salat", "32,00", "Pesce / Fischgerichte", "Mare"),
  menuItem("LUCIOPERCA MARINAIO", "Zanderfilet in Weißweinsoße mit Kartoffeln und Salat", "33,00", "Pesce / Fischgerichte", "Mare"),
  menuItem("LUCIOPERCA CON PESTO", "Zanderfilet mit Tagliatelle, Basilikumpesto und Salat", "33,00", "Pesce / Fischgerichte", "Mare"),
  menuItem("CODA DI ROSPO MEDITERRANEA", "Seeteufelfilet mit Oliven, Kapern, Cocktailtomaten und Salat. Beilage: Knoblauch-Spaghetti oder Grillgemüse", "35,00", "Pesce / Fischgerichte", "Mare"),
  menuItem("CODA DI ROSPO ALLO ZAFFERANO", "Seeteufelfilet mit Tagliatelle, Safransoße und Salat", "36,00", "Pesce / Fischgerichte", "Mare"),
];

const categories = ["Alle", "Salate / Antipaste", "Pizza", "Pasta", "Pesce / Fischgerichte"];
const categoryIcons = { Alle: Sparkles, "Salate / Antipaste": Salad, Pizza: PizzaIcon, Pasta: Utensils, "Pesce / Fischgerichte": Flame };
const heroSlides = [
  { image: "Innen1_b850898b.jpg", label: "La sala", alt: "Innenbereich von Ristorante Pizzeria da Michele Kippenheim" },
  { image: "Aussen_c58e6a71.jpg", label: "La terrazza", alt: "Terrasse von Ristorante Pizzeria da Michele Kippenheim" },
  { image: "Innen2_623c7391.jpg", label: "Il bar", alt: "Bar und zweiter Innenraum von Ristorante Pizzeria da Michele Kippenheim" },
];

const berlinClock = () => {
  const now = new Date();
  const time = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;
  const isOpen = totalMinutes >= 17 * 60 && totalMinutes < 21 * 60 + 30;
  const state = isOpen ? (totalMinutes >= 21 * 60 ? "closing" : "open") : (totalMinutes >= 16 * 60 && totalMinutes < 17 * 60 ? "opening" : "closed");
  return { time, state } as const;
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [query, setQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [clock, setClock] = useState(berlinClock);

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

  useEffect(() => {
    const timer = window.setInterval(() => setClock(berlinClock()), 1000);
    return () => window.clearInterval(timer);
  }, []);

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
          <p className="hero-lede">Unser Restaurant in Kippenheim ist derzeit vorübergehend geschlossen. Wir freuen uns, dich bald wieder mit italienischen Spezialitäten begrüßen zu dürfen.</p>
          <div className="hero-live-clock" aria-live="polite"><div className="hero-live-top"><span className="status-dot manual" /><span>VORÜBERGEHEND GESCHLOSSEN</span><em>INFO</em></div><strong>{clock.time}</strong><span className="hero-live-hours">Derzeit geschlossen · Öffnungszeiten pausieren</span></div>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Speisekarte ansehen <ArrowRight size={16} /></button>
            <a className="text-link" href="tel:+491607917252">Abholung bestellen <span>↗</span></a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">KIPPENHEIM</span><strong>Poststraße 16</strong></div>
          </div>
          <div className="hero-side-note">PIZZA · PASTA · PESCE · AMORE</div>
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
        <div className="intro-text">Frisch zubereitete Pizza, Pasta und Antipasti treffen auf italienische Gemütlichkeit. Im Innenbereich, auf der wunderschönen Terrasse oder einfach zur Abholung — bei uns soll es unkompliziert gut schmecken.</div>
        <div className="intro-signature">a tavola,<br /><span>in Kippenheim</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><span className="kicker">Pizza · Pasta · Pesce</span><h2>Die Karte</h2></div>
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
              <div className="dish-photo dish-photo-text"><span className="dish-category-mark">{dish.category === "Pizza" ? "P" : dish.category === "Pasta" ? "Pa" : dish.category === "Salate / Antipaste" ? "S" : "F"}</span><span className="dish-tag">{dish.tag}</span><button className="dish-arrow" aria-label={`${dish.name} auswählen`} onClick={() => setQuery(dish.name)}>↗</button></div>
              <div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><span className="dish-price">{dish.price} <small>€</small></span></div>
            </article>
          ))}
        </div>
        {filteredDishes.length === 0 && <div className="empty-state"><Sparkles size={18} /><strong>Nichts gefunden.</strong><span>Probier „Pasta“, „Pizza“, „Mozzarella“ oder setze den Filter zurück.</span></div>}
        <div className="menu-footer"><span>{filteredDishes.length} Gerichte gefunden · Alle Preise in Euro</span><button className="button button-dark" onClick={() => { setActiveCategory("Alle"); setQuery(""); setVegetarianOnly(false); }}>Filter zurücksetzen <ArrowRight size={16} /></button></div>
      </section>

      <section className="experience-section">
        <div className="experience-image"><img src={asset("Aussen_c58e6a71.jpg")} alt="Terrasse und Außenbereich von Ristorante Pizzeria da Michele" /><div className="image-label"><span>02</span><strong>La tavola<br /><i>è pronta.</i></strong></div></div>
        <div className="experience-copy"><span className="kicker">Innen & Außen</span><h2>Schön sitzen.<br /><i>Gut essen.</i></h2><p>Die Terrasse mit Brunnen und geschützter Lage im Hof macht unser Restaurant im Sommer zu einem besonderen Ort für Familienessen und lange Gespräche.</p><div className="feature-list"><div><Star size={16} /><span>Wunderschöne Terrasse</span></div><div><Utensils size={16} /><span>Pizza, Pasta & Antipasti</span></div><div><Sparkles size={16} /><span>Abholung telefonisch möglich</span></div></div><a className="text-link dark-link" href="/restaurant">Mehr über uns <span>↗</span></a></div>
      </section>

      <section className="gallery-section" id="galerie">
        <div className="gallery-heading"><div><span className="kicker">Dentro & fuori</span><h2>Einblicke<br /><i>bei uns.</i></h2></div><p>Ein warmer Gastraum, ein zweiter Blick auf die Bar und unsere Terrasse im Hof — entdecke Da Michele, bevor du kommst.</p></div>
        <div className="gallery-grid"><figure className="gallery-item gallery-large"><img src={asset("Innen1_b850898b.jpg")} alt="Angenehmes Ambiente im Innenbereich" /><figcaption><span>01</span> La sala</figcaption></figure><figure className="gallery-item"><img src={asset("Innen2_623c7391.jpg")} alt="Bar und Tische im zweiten Innenraum" /><figcaption><span>02</span> Il bar</figcaption></figure><figure className="gallery-item gallery-tall"><img src={asset("Aussen_c58e6a71.jpg")} alt="Terrasse und Außenbereich" /><figcaption><span>03</span> La terrazza</figcaption></figure></div>
      </section>

      <section className="visit-section" id="visita">
        <div className="visit-left"><span className="kicker">Vieni a trovarci</span><h2>Vorübergehend<br /><i>geschlossen.</i></h2><p>Poststraße 16<br />77971 Kippenheim</p><a className="button button-dark" href="tel:+491607917252">Für Rückfragen anrufen <Phone size={16} /></a></div>
        <div className="visit-right"><div className="hours-card"><div className="hours-title"><Clock3 size={18} /><span>Aktueller Status</span></div><div className="hours-row"><span>Montag — Sonntag</span><b>Vorübergehend geschlossen</b></div></div><div className="contact-links"><a href="tel:+491607917252"><Phone size={15} /> 0160 7917252</a><a href="mailto:bertoldo2300@gmail.com"><Instagram size={15} /> bertoldo2300@gmail.com</a><a href="https://maps.google.com/?q=Poststraße+16+77971+Kippenheim" target="_blank" rel="noreferrer"><MapPin size={15} /> Route planen <ArrowRight size={14} /></a></div><div className="map-card"><div className="map-overlay"><span className="map-pin"><MapPin size={16} /></span><div><strong>Ristorante Pizzeria da Michele</strong><small>Poststraße 16 · Kippenheim</small></div></div><iframe className="restaurant-map" title="Standort von Ristorante Pizzeria da Michele in Kippenheim" src="https://www.google.com/maps?q=Poststra%C3%9Fe+16%2C+77971+Kippenheim&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">DM</span><span>Ristorante Pizzeria da Michele</span></div><span>© 2026 Da Michele · Kippenheim</span><div className="footer-links"><a href="/restaurant">Restaurant</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="/bedingungen">Bedingungen</a></div></footer>
    </main>
  );
}

// React.CSSProperties is used for the stagger custom property above.
