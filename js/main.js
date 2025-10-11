// SimTrade主页交互功能

// DOM元素引用
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const cardHoverElements = document.querySelectorAll('.card-hover');

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-white', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

// 移动端菜单切换
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // 切换图标
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// 移动端菜单项点击后关闭菜单
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 平滑滚动功能
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 考虑导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 添加元素进入视图时的动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);
});

// 卡片悬停动画增强
cardHoverElements.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// 添加返回顶部按钮功能
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fa fa-chevron-up"></i>';
    backToTopButton.className = 'fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg opacity-0 invisible transition-all duration-300 z-50';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化返回顶部按钮
addBackToTopButton();

// 为图片添加懒加载功能
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
}

// 初始化懒加载
setupLazyLoading();

// 高亮当前导航项
function highlightCurrentNavItem() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-gray-dark');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-dark');
                link.classList.add('text-primary');
            }
        });
    });
}

// 初始化导航高亮
highlightCurrentNavItem();

// ===========================================================
// 多语言功能实现
// ===========================================================

// 当前语言存储 - 默认语言为英语
let currentLanguage = 'en';
let translations = {};

// DOM元素引用
const languageSelector = document.getElementById('language-selector');
const languageSelectorMobile = document.getElementById('language-selector-mobile');

/**
 * 加载翻译文件
 * @param {string} lang - 语言代码 (en, zh, de)
 */
async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`无法加载翻译文件: ${response.status}`);
        }
        translations = await response.json();
        return true;
    } catch (error) {
        console.error('加载翻译文件时出错:', error);
        // 在控制台显示详细错误信息，帮助调试
        console.error('当前路径:', window.location.href);
        console.error('尝试加载的文件:', `lang/${lang}.json`);
        return false;
    }
}

/**
 * 应用翻译到页面元素
 */
function applyTranslations() {
    console.log('应用翻译，当前语言:', currentLanguage);
    console.log('翻译数据:', translations);
    
    // 更新HTML lang属性
    document.documentElement.lang = currentLanguage;
    
    // 遍历所有带有data-lang属性的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        
        // 由于HTML和翻译文件现在使用了相同的语义化键名，不需要额外映射
        const actualKey = key;
        
        // 递归查找嵌套键
        function getNestedValue(obj, path) {
            const keys = path.split('.');
            let value = obj;
            for (const k of keys) {
                if (value === null || value === undefined) {
                    return null;
                }
                value = value[k];
            }
            return value;
        }
        
        const translation = getNestedValue(translations, actualKey);
        
        if (translation) {
            // 检查是否包含HTML标签
            if (translation.includes('<') && translation.includes('>')) {
                element.innerHTML = translation;
            } else {
                // 保留原有的HTML结构（例如链接中的图标等）
                // 只替换文本内容
                if (element.children.length > 0) {
                    // 对于有子元素的元素，检查是否有文本节点
                    let textNode = null;
                    for (let i = 0; i < element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType === 3) { // 文本节点
                            textNode = element.childNodes[i];
                            break;
                        }
                    }
                    
                    if (textNode) {
                        textNode.textContent = translation;
                    } else {
                        // 如果没有文本节点，在最后一个子元素后面添加文本
                        element.appendChild(document.createTextNode(translation));
                    }
                } else {
                    // 对于没有子元素的元素，直接替换文本
                    element.textContent = translation;
                }
            }
        } else {
            console.warn(`翻译键不存在: ${actualKey}`);
        }
    });
}

/**
 * 切换语言
 * @param {string} lang - 新的语言代码
 */
async function changeLanguage(lang) {
    console.log('切换语言到:', lang);
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    
    // 保存语言偏好到本地存储
    localStorage.setItem('preferredLanguage', lang);
    
    // 更新两个选择器的选中状态
    languageSelector.value = lang;
    languageSelectorMobile.value = lang;
    
    // 加载并应用翻译
    const success = await loadTranslations(lang);
    if (success) {
        applyTranslations();
    } else {
        console.error('加载翻译失败，保持当前语言:', currentLanguage);
    }
}

/**
 * 初始化多语言功能
 */
async function initMultiLanguage() {
    console.log('初始化多语言功能');
    
    // 尝试从本地存储恢复用户偏好的语言
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLanguage = savedLang;
        console.log('从本地存储恢复语言偏好:', currentLanguage);
    }
    
    // 设置选择器的初始值
    languageSelector.value = currentLanguage;
    languageSelectorMobile.value = currentLanguage;
    
    // 加载默认语言的翻译
    const success = await loadTranslations(currentLanguage);
    if (success) {
        applyTranslations();
    } else {
        console.error('初始加载翻译失败，使用默认文本');
    }
    
    // 添加语言选择器事件监听
    languageSelector.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
    
    languageSelectorMobile.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
    
}

// 当DOM加载完成后初始化多语言功能
document.addEventListener('DOMContentLoaded', () => {
    initMultiLanguage();
});