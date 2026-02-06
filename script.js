// Verificação de senha
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    
    const correctPassword = 'saborroxinha';
    
    if (passwordInput.value === correctPassword) {
        // Senha correta - salvar no localStorage
        localStorage.setItem('franccity_logged_in', 'true');
        localStorage.setItem('franccity_login_time', new Date().getTime());
        
        // Esconder tela de login e mostrar conteúdo
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
        
        // Inicializar o catálogo após o login
        loadVehicles();
        setupEventListeners();
        setupScrollReveal();
        
        // Limpar campo de senha
        passwordInput.value = '';
        errorMessage.classList.remove('show');
    } else {
        // Senha incorreta - mostrar mensagem de erro
        errorMessage.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }
}

// Verificar se já está logado
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('franccity_logged_in');
    const loginTime = localStorage.getItem('franccity_login_time');
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Verificar se está logado e se a sessão não expirou (24 horas)
    const now = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    if (isLoggedIn === 'true' && loginTime && (now - parseInt(loginTime)) < sessionDuration) {
        // Já está logado - mostrar conteúdo diretamente
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 100);
        
        // Inicializar o catálogo
        loadVehicles();
        setupEventListeners();
        setupScrollReveal();
    } else {
        // Não está logado ou sessão expirou - mostrar tela de login
        loginScreen.style.display = 'flex';
        mainContent.style.display = 'none';
        mainContent.classList.remove('show');
        
        // Limpar dados expirados
        localStorage.removeItem('franccity_logged_in');
        localStorage.removeItem('franccity_login_time');
    }
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('franccity_logged_in');
    localStorage.removeItem('franccity_login_time');
    
    const loginScreen = document.getElementById('loginScreen');
    const mainContent = document.getElementById('mainContent');
    
    loginScreen.style.display = 'flex';
    mainContent.style.display = 'none';
    mainContent.classList.remove('show');
}

// Permitir login com Enter e verificar status inicial
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Verificar se já está logado ao carregar a página
    checkLoginStatus();
});

// Database de veículos por categoria
const vehiclesDatabase = {
    ouro: [
        { spawn: "2f2fmle7", name: "Subaru", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "2f2frx7", name: "Mazda RX7", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "2f2fs2000", name: "Carro Rosa", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "denail21", name: "Escalade", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "ikx3_m524b", name: "BMW M5", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "lambf", name: "Lamborghini", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "terzo", name: "Lamborghini Terzo", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "visionlight", name: "Vision Light", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "296gts", name: "Ferrari 296 GTS", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "gemera", name: "Koenigsegg Gemera", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "rmodx6", name: "BMW X6M", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "zenvo", name: "Zenvo ST1", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "bmwm4gts", name: "BMW M4 GTS", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "evo9", name: "Mitsubishi EVO 9", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo", obs: "Sem som" },
        { spawn: "rmodbacalar", name: "Bacalar", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "rmodbentleygt", name: "Bentley GT", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "c7", name: "Corvette C7", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "eclipse", name: "Mitsubishi Eclipse", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "fordmustang", name: "Ford Mustang", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "nivus", name: "VW Nivus", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "sjland", name: "Land Rover", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "gcmtiguan2021", name: "Tiguan 2021", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "ford24", name: "Ford 24", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "hycm8cv", name: "Hyundai", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" }
    ],
    platina: [
        { spawn: "350zdk", name: "Nissan 350Z", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "ff4wrx", name: "Subaru WRX", vel: "350-360", obs: "Melhorar peso" },
        { spawn: "fnfmk4", name: "Eclipse", vel: "300-360", curva: "Médio", freio: "Médio", obs: "Melhorar estabilidade" },
        { spawn: "rx7veilside", name: "Mazda RX7", vel: "350-360", obs: "Manter" },
        { spawn: "silvias15", name: "Nissan Silvia S15", vel: "350-360", curva: "Médio", freio: "Médio" },
        { spawn: "fusca2", name: "Fusca", vel: "350-360", obs: "Manter curva e freio" },
        { spawn: "gcram1500", name: "RAM 1500", vel: "350-360", obs: "Arrumar altura com roda", freio: "Médio", torque: "Médio" },
        { spawn: "wri8evel", name: "WRI8", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "gxm5", name: "BMW M5", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "x6mf96lbwk", name: "BMW X6M", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "amarok", name: "VW Amarok", obs: "Manter e diminuir freio" },
        { spawn: "AmgGtrLight", name: "Mercedes AMG GT", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "bmistralw16", name: "Bugatti Mistral", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "foxevos", name: "Lamborghini Evo", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "gstsvjcade1", name: "Lamborghini SVJ", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "m3f80", name: "BMW M3 F80", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "q6audi23", name: "Audi Q6", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "vulcan", name: "Aston Vulcan", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio", obs: "Adicionar som" },
        { spawn: "evo10", name: "Mitsubishi EVO 10", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "hyctt", name: "Hyundai", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "nissanskyliner34", name: "Nissan Skyline R34", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio", obs: "Melhorar" },
        { spawn: "porsche911", name: "Porsche 911", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio", obs: "Melhorar" },
        { spawn: "24model3", name: "Tesla Model 3", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "718b", name: "Porsche 718", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "bydseal2024", name: "BYD Seal 2024", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "focuscustom", name: "Focus Custom", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "f458", name: "Ferrari 458", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "giulia_2021", name: "Alfa Giulia 2021", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio" },
        { spawn: "jas_rrsurfert", name: "Range Rover", vel: "400-410", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "quadrado", name: "Quadrado", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio", obs: "Arrumar instabilidade" },
        { spawn: "rmodcharger69", name: "Dodge Charger 69", vel: "300-320", curva: "Médio", freio: "Médio" },
        { spawn: "rmodg65", name: "Mercedes G65", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "tecnica", name: "Lamborghini Tecnica", vel: "370-390", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "jetta", name: "VW Jetta", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "unofirma", name: "Uno Firma", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "cayenneturbo", name: "Porsche Cayenne Turbo", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "rampolice", name: "RAM Polícia", vel: "350-360", curva: "Médio", freio: "Médio", arranque: "Médio Alto" },
        { spawn: "DBfbrrham", name: "Discovery", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "HellcatGCSC", name: "Hellcat", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" }
    ],
    diamante: [
        { spawn: "Fxsilverado", name: "Silverado FX", vel: "350-400", curva: "Médio", freio: "Médio", obs: "Melhorar", arranque: "Médio" },
        { spawn: "M235iXD", name: "BMW M235i", vel: "370-420", obs: "Manter", freio: "Médio Alto", obs2: "Tirar um pouco parece que flutua" },
        { spawn: "buggy", name: "Buggy", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "ikx3_r823", name: "Audi R8", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "intemo", name: "Intemo", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "lwgtr", name: "Lamborghini GTR", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "pistaspider19", name: "Pista Spider 19", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "ruccip1", name: "Rucci P1", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "24camzl1x", name: "Camaro ZL1", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "gt2rsmr", name: "Porsche GT2 RS", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio", obs: "Sem som" },
        { spawn: "rmodjeep", name: "Jeep", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio", obs: "Arrumar instabilidade" },
        { spawn: "evo10", name: "Mitsubishi EVO 10", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio", obs: "Arrumar lata comendo paralama" },
        { spawn: "ahksv", name: "HSV", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "bmwg05", name: "BMW G05", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "cvr", name: "CVR", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "dres63amg", name: "Mercedes E63 AMG", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "esc21", name: "ESC 21", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "evo9_2022", name: "EVO 9 2022", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio", obs: "Carro sem som" },
        { spawn: "fbgolfr18370", name: "Golf R18", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "gle53", name: "Mercedes GLE 53", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "Imola", name: "Imola", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio" },
        { spawn: "keveg6", name: "Kev G6", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio", obs: "Manter velocidade" },
        { spawn: "m3tab", name: "BMW M3", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "passat", name: "VW Passat", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Tirar palheta, subir suspensão" },
        { spawn: "playaangiec8", name: "Angie C8", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Arrumar curva e instabilidade" },
        { spawn: "rmodsianr", name: "Sian R", vel: "370-420", obs: "Manter" },
        { spawn: "toyotasupra", name: "Toyota Supra", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Arrumar instabilidade" },
        { spawn: "bmwm1wb", name: "BMW M1", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "jettagli", name: "Jetta GLI", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "fortuner", name: "Toyota Fortuner", vel: "350-380", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "22m5sal", name: "BMW M5 Saloon", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "r33ptnc", name: "Nissan R33", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "rs3s20", name: "Audi RS3", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "keyvanyrs6", name: "RS6 Keyvany", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "toyotasupra2", name: "Toyota Supra 2", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "v447", name: "V447", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "db24shels650pem", name: "Shelby 650", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "silvia", name: "Nissan Silvia", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Tirar drift e melhorar instabilidade" },
        { spawn: "golf25r", name: "Golf R25", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "nbtem25", name: "NB TEM 25", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" },
        { spawn: "at420", name: "AT 420", vel: "370-420", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Melhorar instabilidade" }
    ],
    franca: [
        { spawn: "formulax", name: "Formula X", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "audirs7", name: "Audi RS7", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "pfistermansur", name: "Pfister Mansur", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", obs: "Manter instabilidade, não sai do chão" },
        { spawn: "peptos_911rs", name: "Porsche 911 RS", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto" },
        { spawn: "playabootyrx", name: "Booty RX", vel: "450-480", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Tirar dinossauro" },
        { spawn: "vc_polgt63s", name: "Porsche GT63S", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Instabilidade média alta" },
        { spawn: "bmwm2pak", name: "BMW M2", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Instabilidade média alta" },
        { spawn: "R35", name: "Nissan GTR R35", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Instabilidade média alta" },
        { spawn: "Gxa45", name: "GXA 45", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Instabilidade média alta" },
        { spawn: "DURANGOCRB", name: "Durango CRB", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Instabilidade média alta" },
        { spawn: "ikx3_r823", name: "Audi R8", vel: "450-500", freio: "Médio Alto", curva: "Médio Alto", arranque: "Médio Alto", obs: "Instabilidade média alta" }
    ],
    exclusivo: [
        { spawn: "drone", name: "Drone", vel: "550-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Veículo exclusivo" },
        { spawn: "fsf90xx", name: "SF90 XX", vel: "550-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "cwx3", name: "CWX3", vel: "400-450", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "mansurus", name: "Mansurus", vel: "450-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "10r24nbrt", name: "Kawasaki 10R", vel: "380-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "cbr1000rrr", name: "CBR 1000RR", vel: "380-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta, corrigir erro tuning" },
        { spawn: "s1000docandidato", name: "S1000", vel: "450-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "dc_sl63mansory", name: "SL63 Mansory", vel: "450-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta, arrumar lata" },
        { spawn: "atom", name: "Ariel Atom", vel: "300-350", obs: "Tirar um pouco do freio" },
        { spawn: "23gt3rsja", name: "Porsche GT3 RS", vel: "500-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "p911gt2rs", name: "Porsche 911 GT2 RS", vel: "500-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "ahksv", name: "HSV", vel: "500-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" },
        { spawn: "mogt63", name: "Mercedes GT63", vel: "450-550", curva: "Médio Alto", freio: "Médio Alto", obs: "Arrancada média alta" }
    ],
    som: [
        { spawn: "F250Deboxe", name: "F250 Deboxe", vel: "200-200", obs: "Manter como está" },
        { spawn: "paredaoGRANDE", name: "Paredão Grande", obs: "Carro som" },
        { spawn: "CeltaCH", name: "Celta CH", obs: "Manter como está" },
        { spawn: "saveiro", name: "Saveiro", obs: "Manter como está" },
        { spawn: "amarokreb", name: "Amarok Rebaixada", obs: "Manter como está" },
        { spawn: "s10ori", name: "S10 Original", obs: "Manter como está e aumentar suspensão" },
        { spawn: "saveirosom", name: "Saveiro Som", vel: "230-250", obs: "Melhorar instabilidade, arrumar pneu pegando paralama, adicionar supiro fluiter" },
        { spawn: "up", name: "VW Up", vel: "290-320", curva: "Médio", freio: "Médio", arranque: "Médio", obs: "Tirar lista, colocar franca na placa, letra DNZ2018" },
        { spawn: "tremetreme", name: "Treme Treme", obs: "Carro som" },
        { spawn: "Carreta", name: "Carreta", obs: "Carro som" },
        { spawn: "hiluxags", name: "Hilux AGS", obs: "Manter velocidade e virar um pouco mais" },
        { spawn: "sava", name: "Sava", obs: "Manter velocidade" }
    ],
    moto: [
        { spawn: "20yzfr1", name: "Yamaha R1", vel: "390-400", curva: "Médio Alto", freio: "Médio Alto", arranque: "Médio Alto", obs: "Hyper +" },
        { spawn: "africa", name: "Africa Twin", vel: "350-360", curva: "Médio", freio: "Médio", obs: "Hyper" },
        { spawn: "Brossfac", name: "Bross Fac", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo", obs: "Ouro" },
        { spawn: "f4rr", name: "MV Agusta F4RR", obs: "Manter como está" },
        { spawn: "gs310r", name: "BMW GS310R", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo", obs: "Ouro/Pass" },
        { spawn: "mt09", name: "Yamaha MT09", vel: "370-420", curva: "Médio Alto", freio: "Médio Alto", obs: "Hyper +" },
        { spawn: "mvso", name: "MV Agusta", vel: "370-420", curva: "Médio Alto", freio: "Médio Alto", obs: "Hyper +" },
        { spawn: "r1200gs", name: "BMW R1200GS", vel: "370-420", curva: "Médio Alto", freio: "Médio Alto", obs: "Hyper +" },
        { spawn: "sr1", name: "SR1", vel: "340-370", curva: "Médio", freio: "Médio", obs: "Platina" },
        { spawn: "tenere1200", name: "Ténéré 1200", vel: "350-360", curva: "Médio", freio: "Médio", torque: "Médio", obs: "Hyper" },
        { spawn: "tiger1200", name: "Tiger 1200", vel: "370-420", curva: "Médio Alto", freio: "Médio Alto", obs: "Hyper +" },
        { spawn: "xj6", name: "Yamaha XJ6", obs: "Manter como está", obs2: "Ouro" },
        { spawn: "xre2020", name: "Honda XRE 2020", vel: "340-370", curva: "Médio", freio: "Médio", obs: "Platina" },
        { spawn: "xt660vip", name: "XT660 VIP", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo" },
        { spawn: "z1000", name: "Kawasaki Z1000", vel: "340-370", curva: "Médio", freio: "Médio", obs: "Platina" },
        { spawn: "zx10", name: "Kawasaki ZX10", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo", obs: "Ouro" },
        { spawn: "r1sakura", name: "R1 Sakura", vel: "350-360", curva: "Médio", freio: "Médio", torque: "Médio", obs: "Hyper" }
    ],
    blindado: [
        { spawn: "ballercustom", name: "Baller Custom", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "chyperg07", name: "G07 Blindado", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "foxct", name: "Fox CT", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "primogenito", name: "Primogênito", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "chyperxx", name: "Hyper XX", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "m7mans", name: "M7 Mansory", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "mans22m5", name: "M22 M5", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "dc_s500mansory", name: "S500 Mansory", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "glsmansory850", name: "GLS Mansory 850", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "m3touringcsl", name: "M3 Touring CSL", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" },
        { spawn: "velarag", name: "Velar AG", vel: "400-400", curva: "Médio Alto", freio: "Médio Alto", obs: "Arranque médio alto" }
    ],
    outros: [
        { spawn: "rmodskyline34", name: "Skyline R34", vel: "460-480", obs: "Venda apenas VIP" },
        { spawn: "urus", name: "Urus", vel: "150-160", curva: "Baixa", freio: "Baixo", obs: "Carro inicial, adicionar textura logo" },
        { spawn: "adv2023", name: "ADV 2023", obs: "Moto talvez box" },
        { spawn: "peptos_h2", name: "Peptos H2", vel: "350-380", obs: "Tirar neons, manter" },
        { spawn: "Rmodtracktor", name: "Trator Legal", vel: "30", obs: "Trator do grão" },
        { spawn: "cg160", name: "CG 160", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo", obs: "Moto box" },
        { spawn: "Pcx", name: "Honda PCX", vel: "310-315", curva: "Médio Baixo", freio: "Médio Baixo", obs: "Moto pass" },
        { spawn: "bike", name: "Bike", obs: "Manter como está", obs2: "BOX" },
        { spawn: "brasilia", name: "Brasília", vel: "200-250", curva: "Médio", freio: "Médio", obs: "Pass" },
        { spawn: "Fusionreba", name: "Fusion Rebaixado", obs: "Manter como está", obs2: "Pass" },
        { spawn: "mobi", name: "Fiat Mobi", obs: "Manter como está" },
        { spawn: "vwgol", name: "VW Gol", obs: "Manter" }
    ]
};

// Variáveis globais
let currentFilter = 'all';
let vehicles = [];

// Inicialização (só executa após login)
function initializeApp() {
    // Esta função será chamada após o login bem-sucedido
}

// Carregar veículos
function loadVehicles(category = 'all') {
    const vehicleGrid = document.getElementById('vehicleGrid');
    vehicleGrid.innerHTML = '';
    
    let categoryVehicles = [];
    
    if (category === 'all') {
        // Carregar todas as categorias
        Object.keys(vehiclesDatabase).forEach(cat => {
            categoryVehicles = categoryVehicles.concat(vehiclesDatabase[cat]);
        });
    } else {
        // Carregar categoria específica
        categoryVehicles = vehiclesDatabase[category] || [];
    }
    
    categoryVehicles.forEach((vehicle, index) => {
        const card = createVehicleCard(vehicle, category === 'all' ? getCategoryBySpawn(vehicle.spawn) : category);
        vehicleGrid.appendChild(card);
        
        // Adicionar animação de entrada
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
    
    // Adicionar event listeners aos botões de cópia
    setTimeout(() => addCopyListeners(), 100);
}

// Obter categoria pelo spawn
function getCategoryBySpawn(spawn) {
    for (const [category, vehicles] of Object.entries(vehiclesDatabase)) {
        if (vehicles.some(v => v.spawn === spawn)) {
            return category;
        }
    }
    return 'ouro';
}

// Adicionar listeners aos botões de cópia
function addCopyListeners() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const spawn = this.dataset.spawn;
            const name = this.dataset.name;
            copySpawn(spawn, name);
        });
    });
}

// Função para obter URL da imagem do veículo
function getVehicleImageUrl(vehicle, category) {
    // Tentar imagem local primeiro (.png)
    const localImagePng = `images/${vehicle.spawn}.png`;
    const localImageJpg = `images/${vehicle.spawn}.jpg`;
    
    // Retornar imagem local (o navegador vai tentar carregar)
    return localImagePng;
}

// Criar card de veículo
function createVehicleCard(vehicle, category) {
    const card = document.createElement('div');
    card.className = 'vehicle-card';
    card.dataset.category = category;
    card.dataset.spawn = vehicle.spawn;
    
    const categoryColors = {
        ouro: 'badge-ouro',
        platina: 'badge-platina',
        diamante: 'badge-diamante',
        franca: 'badge-franca',
        royal: 'badge-royal',
        exclusivo: 'badge-exclusivo',
        som: 'badge-som',
        moto: 'badge-moto',
        blindado: 'badge-blindado',
        outros: 'badge-outros'
    };
    
    card.innerHTML = `
        <div class="vehicle-image">
            <img src="images/${vehicle.spawn}.png" alt="${vehicle.name}" onerror="this.src='images/${vehicle.spawn}.jpg'; this.onerror='this.src=\'https://via.placeholder.com/300x200/2d2d2d/ffffff?text=${encodeURIComponent(vehicle.name)}\''">
            <span class="vehicle-badge ${categoryColors[category]}">${category.toUpperCase()}</span>
        </div>
        <div class="vehicle-info">
            <h3 class="vehicle-name">${vehicle.name}</h3>
            <div class="spawn-code">
                <i class="fas fa-code"></i>
                <span>${vehicle.spawn}</span>
            </div>
            <div class="vehicle-stats">
                <div class="stat-item">
                    <div class="stat-value">${vehicle.vel || 'N/A'}</div>
                    <div class="stat-label">Velocidade</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${vehicle.curva || 'N/A'}</div>
                    <div class="stat-label">Curva</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${vehicle.freio || 'N/A'}</div>
                    <div class="stat-label">Freio</div>
                </div>
            </div>
            ${vehicle.obs ? `<div class="vehicle-obs"><i class="fas fa-info-circle"></i> ${vehicle.obs}</div>` : ''}
            <button class="copy-btn" data-spawn="${vehicle.spawn}" data-name="${vehicle.name}">
                <i class="fas fa-copy"></i>
                Copiar Spawn
            </button>
        </div>
    `;
    
    return card;
}

// Copiar spawn para área de transferência
function copySpawn(spawn, name) {
    // Tentar usar a API moderna primeiro
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(spawn).then(() => {
            showNotification(`Spawn "${spawn}" copiado com sucesso!`);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            fallbackCopy(spawn);
        });
    } else {
        // Fallback para navegadores antigos ou HTTP
        fallbackCopy(spawn);
    }
}

// Função fallback para copiar
function fallbackCopy(spawn) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = spawn;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showNotification(`Spawn "${spawn}" copiado com sucesso!`);
        } else {
            showNotification('Erro ao copiar spawn. Tente novamente.');
        }
    } catch (err) {
        console.error('Erro no fallback:', err);
        showNotification('Erro ao copiar spawn. Tente novamente.');
    }
}

// Mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterVehicles();
        });
    });
    
    // Busca
    document.getElementById('searchInput').addEventListener('input', function(e) {
        searchVehicles(e.target.value);
    });
    
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Filtrar veículos
function filterVehicles() {
    // Recarregar veículos com o filtro atual
    loadVehicles(currentFilter);
}

// Buscar veículos
function searchVehicles(query) {
    if (!query) {
        loadVehicles(currentFilter);
        return;
    }
    
    const vehicleGrid = document.getElementById('vehicleGrid');
    vehicleGrid.innerHTML = '';
    
    const lowerQuery = query.toLowerCase();
    let foundVehicles = [];
    
    if (currentFilter === 'all') {
        // Buscar em todas as categorias
        Object.keys(vehiclesDatabase).forEach(cat => {
            const matches = vehiclesDatabase[cat].filter(vehicle => 
                vehicle.name.toLowerCase().includes(lowerQuery) || 
                vehicle.spawn.toLowerCase().includes(lowerQuery)
            );
            foundVehicles = foundVehicles.concat(matches.map(v => ({...v, category: cat})));
        });
    } else {
        // Buscar apenas na categoria atual
        foundVehicles = vehiclesDatabase[currentFilter]
            .filter(vehicle => 
                vehicle.name.toLowerCase().includes(lowerQuery) || 
                vehicle.spawn.toLowerCase().includes(lowerQuery)
            )
            .map(v => ({...v, category: currentFilter}));
    }
    
    foundVehicles.forEach((vehicle, index) => {
        const card = createVehicleCard(vehicle, vehicle.category);
        vehicleGrid.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 50);
    });
    
    setTimeout(() => addCopyListeners(), 100);
}

// Animar estatísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Calcular quantidade real de veículos
    let totalVehicles = 0;
    Object.keys(vehiclesDatabase).forEach(category => {
        totalVehicles += vehiclesDatabase[category].length;
    });
    
    // Atualizar o valor do stat de spawns
    const spawnsStat = document.querySelector('.stat-number[data-target]');
    if (spawnsStat) {
        spawnsStat.setAttribute('data-target', totalVehicles);
        spawnsStat.textContent = '0';
    }
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Configurar scroll reveal
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});