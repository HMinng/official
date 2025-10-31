// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // 切换按钮图标
        mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// 点击菜单项后关闭移动菜单
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = '☰';
            }
        }
    });
});

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 添加阴影效果
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 表单提交处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // 表单验证
        const name = data.name?.trim();
        const email = data.email?.trim();
        const phone = data.phone?.trim();
        const subject = data.subject?.trim();
        const message = data.message?.trim();
        
        if (!name || !email || !phone || !subject || !message) {
            alert('请填写所有必填项！');
            return;
        }
        
        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址！');
            return;
        }
        
        // 验证手机号格式（简单验证）
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone.replace(/\s|-/g, ''))) {
            alert('请输入有效的手机号码！');
            return;
        }
        
        // 模拟表单提交
        console.log('表单数据：', data);
        
        // 显示成功消息
        alert('提交成功！我们会在24小时内与您联系。');
        
        // 重置表单
        contactForm.reset();
        
        // 实际项目中，这里应该发送数据到后端
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     alert('提交成功！我们会在24小时内与您联系。');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('提交失败，请稍后重试。');
        //     console.error('Error:', error);
        // });
    });
}

// 数字动画效果（用于统计数据）
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-item h4');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const hasPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numericValue) && numericValue > 0) {
            let current = 0;
            const increment = numericValue / 50; // 50步完成动画
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (isPercentage) {
                    stat.textContent = displayValue + '%';
                } else if (hasPlus) {
                    stat.textContent = displayValue + '+';
                } else {
                    stat.textContent = displayValue;
                }
            }, 30);
        }
    });
};

// 元素进入视口时触发动画
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 如果是统计数据区域，触发数字动画
                if (entry.target.querySelector('.stat-item')) {
                    animateNumbers();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有卡片和容器
    const elements = document.querySelectorAll('.feature-card, .service-card, .news-card, .about-content, .stats-grid');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 返回顶部按钮
const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(btn);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
        } else {
            btn.style.opacity = '0';
        }
    });
    
    // 点击返回顶部
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 鼠标悬停效果
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-5px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
};

// 创建返回顶部按钮
createBackToTop();

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    // ESC键关闭移动菜单
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.textContent = '☰';
        }
    }
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口大小改变时处理
const handleResize = debounce(() => {
    // 如果窗口变大，关闭移动菜单
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.textContent = '☰';
        }
    }
}, 250);

window.addEventListener('resize', handleResize);

// 图片懒加载（如果需要）
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// 性能优化：预加载关键页面
const preloadPages = () => {
    const criticalPages = ['about.html', 'services.html', 'contact.html'];
    criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
};

// 页面完全加载后预加载其他页面
window.addEventListener('load', () => {
    setTimeout(preloadPages, 2000);
});

