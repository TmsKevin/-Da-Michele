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
  {
    name: "Burrata al Tartufo",
    description: "Cremige Burrata, schwarzer Trüffel, geröstete Haselnuss",
    price: "16",
    category: "Antipasti",
    tag: "Chef's pick",
    image: asset("osteria-pasta_65681d4f.jpg"),
  },
  {
    name: "Spaghetti al Pomodoro",
    description: "San Marzano, Basilikum, Parmigiano Reggiano 36 mesi",
    price: "15",
    category: "Pasta",
    tag: "Signature",
    image: asset("osteria-pasta_65681d4f.jpg"),
  },
  {
    name: "Pappardelle al Cinghiale",
    description: "Handgeschnittene Pasta, Wildschwein-Ragù, Pecorino",
    price: "22",
    category: "Pasta",
    tag: "Slow food",
    image: asset("osteria-pasta_65681d4f.jpg"),
  },
  {
    name: "Pizza Diavola",
    description: "Fior di latte, scharfe 'Nduja, Chiliöl, Oregano",
    price: "18",
    category: "Pizza",
    tag: "Fired daily",
    image: asset("osteria-pizza_960774d5.jpeg"),
  },
  {
    name: "Pizza Margherita 2.0",
    description: "Datterini, Fior di latte, Basilikum, Olivenöl nuovo",
    price: "16",
    category: "Pizza",
    tag: "Classico",
    image: asset("osteria-pizza_960774d5.jpeg"),
  },
  {
    name: "Branzino alla Brace",
    description: "Wilder Wolfsbarsch, Fenchel, Zitrone, Salsa verde",
    price: "28",
    category: "Secondi",
    tag: "Market fish",
    image: asset("osteria-wine_7f7c2bb0.webp"),
  },
  {
    name: "Tiramisù Luce",
    description: "Mascarpone, Espresso, Kakao, hausgemachte Savoiardi",
    price: "10",
    category: "Dolci",
    tag: "Must try",
    image: asset("osteria-pasta_65681d4f.jpg"),
  },
  {
    name: "Affogato al Caffè",
    description: "Fior di latte Gelato, Espresso, Meersalz",
    price: "8",
    category: "Dolci",
    tag: "After dinner",
    image: asset("osteria-wine_7f7c2bb0.webp"),
  },
];

const categories = ["Alle", "Antipasti", "Pasta", "Pizza", "Secondi", "Dolci"];

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
        <a className="brand" href="#top" aria-label="Osteria Luce Startseite">
          <span className="brand-mark">OL</span>
          <span className="brand-copy"><b>OSTERIA</b><em>LUCE</em></span>
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
          <div className="eyebrow"><span className="eyebrow-line" /> Cucina italiana contemporanea <span className="eyebrow-dot">✦</span></div>
          <h1>Ein Stück <i>Italien.</i><br />Mitten in Berlin.</h1>
          <p className="hero-lede">Ehrliche Zutaten. Zeitlose Rezepte. Ein Abend, der nach Süden schmeckt.</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Speisekarte ansehen <ArrowRight size={16} /></button>
            <button className="text-link" onClick={openReservation}>Tisch sichern <span>↗</span></button>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">HEUTE GEÖFFNET</span><strong>12:00 — 00:00</strong></div>
            <div><span className="meta-label">KREUZBERG</span><strong>Paul-Lincke-Ufer 42</strong></div>
          </div>
        </div>
        <div className="hero-visual">
          <img src={asset("osteria-hero_13a0059d.jpg")} alt="Pizza auf einem Tisch in der Osteria Luce" />
          <div className="hero-image-shade" />
          <div className="hero-stamp"><span>DAL 2014</span><strong>Fatto<br /><i>con</i><br />amore</strong></div>
          <div className="hero-caption"><span>01 / 04</span><span>La nostra pizza, ogni giorno.</span></div>
        </div>
        <div className="scroll-note"><span /> SCROLL TO TASTE</div>
      </section>

      <section className="intro-strip" id="filosofia">
        <div className="intro-number">01</div>
        <div className="intro-title"><span>Unsere</span><strong>Filosofia</strong></div>
        <div className="intro-text">Wir glauben an Teller, die nicht laut sein müssen. An Pasta, die Zeit braucht. An Wein, der Geschichten erzählt. Und daran, dass die besten Abende immer ein bisschen länger dauern.</div>
        <div className="intro-signature">con amore,<br /><span>la famiglia Luce</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><span className="kicker">Cosa c'è di nuovo</span><h2>Die Karte</h2></div>
          <p>Unsere Küche folgt der Saison — und dem, worauf wir heute Lust haben.</p>
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
        <div className="experience-image"><img src={asset("osteria-wine_7f7c2bb0.webp")} alt="Wein und italienische Gerichte am Tisch" /><div className="image-label"><span>02</span><strong>La tavola<br /><i>è pronta.</i></strong></div></div>
        <div className="experience-copy"><span className="kicker">Der Abend gehört dir</span><h2>Mehr als<br /><i>nur</i> Essen.</h2><p>Von der ersten Flasche bis zum letzten Espresso: Unsere Räume sind für lange Nächte gemacht. Komm hungrig, geh glücklich.</p><div className="feature-list"><div><Star size={16} /><span>Ausgewählte Naturweine</span></div><div><Utensils size={16} /><span>Handgemachte Pasta täglich</span></div><div><Sparkles size={16} /><span>Private Dining für besondere Momente</span></div></div><button className="text-link dark-link" onClick={openReservation}>Deinen Abend planen <span>↗</span></button></div>
      </section>

      <section className="visit-section" id="visita">
        <div className="visit-left"><span className="kicker">Vieni a trovarci</span><h2>Bis bald<br /><i>bei uns.</i></h2><p>Paul-Lincke-Ufer 42<br />10999 Berlin · Kreuzberg</p><button className="button button-dark" onClick={openReservation}>Tisch reservieren <ArrowRight size={16} /></button></div>
        <div className="visit-right"><div className="hours-card"><div className="hours-title"><Clock3 size={18} /><span>Öffnungszeiten</span></div><div className="hours-row"><span>Mo — Do</span><b>12:00 — 23:00</b></div><div className="hours-row"><span>Fr — Sa</span><b>12:00 — 00:00</b></div><div className="hours-row"><span>Sonntag</span><b>12:00 — 22:00</b></div></div><div className="contact-links"><a href="tel:+493055571942"><Phone size={15} /> +49 30 555 71 942</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> @osteria.luce</a><a href="https://maps.google.com/?q=Paul-Lincke-Ufer+42+Berlin" target="_blank" rel="noreferrer"><MapPin size={15} /> Route planen <ArrowRight size={14} /></a></div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">OL</span><span>OSTERIA LUCE</span></div><span>© 2024 Osteria Luce · Made with amore</span><div className="footer-links"><a href="#top">Instagram</a><a href="#top">Impressum</a><a href="#top">Datenschutz</a></div></footer>

      {reservationOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setReservationOpen(false); }}><div className="reservation-modal"><button className="modal-close" onClick={() => setReservationOpen(false)} aria-label="Reservierung schließen"><X /></button>{reserved ? <div className="reserved-state"><span className="success-mark">✓</span><span className="kicker">Perfetto</span><h2>Dein Tisch<br /><i>ist angefragt.</i></h2><p>Wir melden uns gleich bei dir mit der Bestätigung.</p><button className="button button-dark" onClick={() => setReservationOpen(false)}>Schließen</button></div> : <><span className="kicker">La tua serata</span><h2>Tisch<br /><i>reservieren.</i></h2><p className="modal-copy">Sag uns, wann du kommen möchtest — wir halten dir den besten Platz frei.</p><div className="reservation-fields"><label><span>Datum</span><div><CalendarDays size={16} /><input type="date" defaultValue="2024-06-21" /></div></label><label><span>Uhrzeit</span><div><Clock3 size={16} /><select defaultValue="19:30"><option>18:30</option><option>19:30</option><option>20:30</option><option>21:00</option></select><ChevronDown size={15} /></div></label><label><span>Gäste</span><div><Utensils size={16} /><select defaultValue="2 Personen"><option>2 Personen</option><option>3 Personen</option><option>4 Personen</option><option>5+ Personen</option></select><ChevronDown size={15} /></div></label></div><button className="button button-dark full-button" onClick={() => setReserved(true)}>Anfrage senden <ArrowRight size={16} /></button></>}</div></div>}
    </main>
  );
}

// React.CSSProperties is used for the stagger custom property above.
