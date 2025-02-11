// script.js

// Função para alternar o tema
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        // Mudar para tema light
        body.removeAttribute('data-theme');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        // Mudar para tema dark
        body.setAttribute('data-theme', 'dark');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Carregar preferência de tema salva
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
});

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
let isPlaying = false;

// Função para mudar os slides com animação suave
function changeSlide(n) {
    // Remove a classe active do slide atual com fade out
    slides[slideIndex].style.opacity = '0';
    setTimeout(() => {
        slides[slideIndex].classList.remove('active');
        
        // Calcula o novo índice
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        
        // Adiciona a classe active ao novo slide com fade in
        slides[slideIndex].classList.add('active');
        slides[slideIndex].style.opacity = '1';
    }, 300);
}

// Função para avançar automaticamente os slides
function autoSlide() {
    changeSlide(1);
}

// Define o intervalo para trocar os slides automaticamente
let slideInterval = setInterval(autoSlide, 5000);

// Controle do slideshow com mouse
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
});

// Controle de Música com animação do ícone
const audio = document.getElementById('bgMusic');
const musicBtn = document.querySelector('.music-btn');

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        musicBtn.classList.add('playing');
    } else {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
    }
}

// script.js
const startDate = new Date('2024-08-25T00:00:00');

function calcularDiferenca() {
    const now = new Date();
    const diff = now - startDate;
    
    // Convertendo milissegundos para unidades de tempo
    const segundos = Math.floor((diff / 1000) % 60);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diasTotais = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Calculando meses completos e dias restantes
    const meses = Math.floor(diasTotais / 30.436875); // média de dias por mês
    const dias = Math.floor(diasTotais % 30.436875);
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    return {
        anos,
        meses: mesesRestantes,
        dias,
        horas,
        minutos,
        segundos
    };
}

function updateCounter() {
    const diff = calcularDiferenca();
    
    const timeBlocksHTML = `
        <div class="time-blocks">
            <div class="time-block">
                <div class="time-value">${diff.anos}</div>
                <div class="time-label">${diff.anos === 1 ? 'Ano' : 'Anos'}</div>
            </div>
            <div class="time-block">
                <div class="time-value">${diff.meses}</div>
                <div class="time-label">${diff.meses === 1 ? 'Mês' : 'Meses'}</div>
            </div>
            <div class="time-block">
                <div class="time-value">${diff.dias}</div>
                <div class="time-label">${diff.dias === 1 ? 'Dia' : 'Dias'}</div>
            </div>
        </div>
    `;

    const timeDetailsHTML = `
        <div class="time-details">
            <span>${diff.horas} ${diff.horas === 1 ? 'hora' : 'horas'}</span>
            <i class="fas fa-heart heart-icon"></i>
            <span>${diff.minutos} ${diff.minutos === 1 ? 'minuto' : 'minutos'}</span>
            <i class="fas fa-heart heart-icon"></i>
            <span>${diff.segundos} ${diff.segundos === 1 ? 'segundo' : 'segundos'}</span>
        </div>
    `;

    document.getElementById('counter').innerHTML = timeBlocksHTML + timeDetailsHTML;
}

// Inicializa o contador
updateCounter();

// Atualiza o contador a cada segundo
setInterval(updateCounter, 1000);