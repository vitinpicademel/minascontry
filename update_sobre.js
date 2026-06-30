const fs = require('fs');

let html = fs.readFileSync('sobre.html', 'utf8');

// 1. Title color
html = html.replace('<h1 class="about-hero-title">', '<h1 class="about-hero-title" style="color: var(--white);">');

// 2. Fix duplicated text and malformed divs in story 1
html = html.replace(
  `<div class="story-img-wrapper reveal">\r\n          <img src="https://images.unsplash.com/photo-1544485521-ad7b3d37aee1?auto=format&fit=crop&q=80" alt="Fábrica Ponto Country" class="story-img">\r\n        </div>\r\n          <p>Fundada por Carmelito e sua esposa, Teresinha, a empresa teve início de forma simples e dedicada. Com uma bicicleta, Carmelito percorria as cidades da região, levando produtos exclusivos e diferenciados aos fazendeiros locais.</p>\r\n        </div>`,
  `<div class="story-img-wrapper reveal">\r\n          <img src="images/sobre_factory.png" alt="Fábrica Ponto Country" class="story-img">\r\n        </div>`
);
// Fallback if line endings differ
html = html.replace(
  /<div class="story-img-wrapper reveal">[\s\S]*?<img src="https:\/\/images\.unsplash\.com\/photo-1544485521-ad7b3d37aee1.*?class="story-img">[\s\S]*?<\/div>[\s\S]*?<p>Fundada por Carmelito.*?<\/p>[\s\S]*?<\/div>/,
  `<div class="story-img-wrapper reveal">\n          <img src="images/sobre_factory.png" alt="Fábrica Ponto Country" class="story-img">\n        </div>`
);

// 3. Fix duplicated text and malformed divs in story 2
html = html.replace(
  /<div class="story-img-wrapper reveal" style="order:-1">[\s\S]*?<img src="https:\/\/images\.unsplash\.com\/photo-1595859702958-963a75c12852.*?class="story-img">[\s\S]*?<\/div>([\s\S]*?)<\/div>[\s\S]*?<p>Ao longo dos anos.*?<\/p>[\s\S]*?<\/div>/,
  `<div class="story-img-wrapper reveal" style="order:-1">\n          <img src="images/sobre_evolution.png" alt="Artesão" class="story-img">\n        </div>$1</div>`
);

// 4. Update footer
const newFooter = `<footer>
  <div class="footer-inner">
    <div class="footer-grid" style="grid-template-columns: 2fr 1fr 1fr 1fr;">
      <div>
        <div class="footer-brand-name">Minas Country</div>
        <p class="footer-brand-desc">Loja e fábrica mineira. Tradição, qualidade e amor ao campo desde 1968.</p>
        <a href="https://www.instagram.com/pontocountry.oficial/" target="_blank" style="display:inline-flex; align-items:center; gap:8px; color:rgba(255,255,255,0.6); text-decoration:none; margin-top:1rem; font-weight:700;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          @pontocountry.oficial
        </a>
      </div>
      <div class="footer-col">
        <h4>Navegação</h4>
        <a href="index.html">Início</a>
        <a href="index.html#catalogo">Loja / Produtos</a>
        <a href="sobre.html">Quem Somos</a>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <a href="https://wa.me/5534988756121" target="_blank">(34) 98875-6121 (WhatsApp)</a>
        <a href="tel:3433154469">(34) 3315-4469</a>
      </div>
      <div class="footer-col">
        <h4>Endereço</h4>
        <p style="font-size:0.95rem; color:rgba(255,255,255,0.6); line-height:1.6;">Rua São João Del Rei, 220<br>Parque das Américas<br>Uberaba - MG, 38045-080</p>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 Minas Country. Todos os direitos reservados.</span>
    </div>
  </div>
</footer>`;

html = html.replace(/<footer>[\s\S]*?<\/footer>/, newFooter);

fs.writeFileSync('sobre.html', html, 'utf8');

// UPDATE CSS for spacing and watermark
let css = fs.readFileSync('style.css', 'utf8');

// Fix spacing on about-hero
css = css.replace('.about-hero{margin-top:150px;background:var(--wine-dark);color:var(--white);padding:8rem 2rem;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.1)}', '.about-hero{margin-top:136px;background:var(--wine-dark);color:var(--white);padding:6rem 2rem;text-align:center;position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.1)}');

// Fix watermark
css = css.replace('.story-watermark{position:absolute;left:-5%;top:15%;font-family:\'Fraunces\',serif;font-size:clamp(6rem,12vw,14rem);color:var(--border);opacity:0.3;font-weight:700;line-height:1;z-index:1;user-select:none;letter-spacing:-4px}', '.story-watermark{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);font-family:\'Fraunces\',serif;font-size:clamp(10rem,15vw,22rem);color:var(--black);opacity:0.04;font-weight:700;line-height:1;z-index:0;user-select:none;letter-spacing:-4px; pointer-events:none; width:100%; text-align:center;}');

// Add subtle cream-dark background to story section to avoid plain white
css = css.replace('.story-section{background:var(--cream);padding:8rem 0;position:relative;border-top:1px solid var(--border)}', '.story-section{background:var(--cream-dark);padding:6rem 0;position:relative;border-top:1px solid var(--border)}');

fs.writeFileSync('style.css', css, 'utf8');

console.log('Update Complete');
