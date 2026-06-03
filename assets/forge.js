// Navigasi Tab
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  document.querySelector('[data-tab="' + tabId + '"]').classList.add('active');
}

// Akordion Use Case
function toggleCase(header) {
  const body = header.nextElementSibling;
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.use-case-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.use-case-header').forEach(h => h.classList.remove('open'));
  if (!isOpen) {
    body.classList.add('open');
    header.classList.add('open');
  }
}

// Copy Prompt ke Clipboard
function copyPrompt(btn) {
  const block = btn.parentElement;
  const text = block.querySelector('p').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ tersalin';
    setTimeout(() => btn.textContent = orig, 1800);
  });
}

// Inisialisasi animasi Audio Visualizer (jika elemen ada di halaman)
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.audio-bar');
  if (bars.length > 0) {
    bars.forEach((bar, i) => {
      bar.style.animationDelay = (i * 0.15) + 's';
    });
  }
});