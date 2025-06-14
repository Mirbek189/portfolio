document.addEventListener('DOMContentLoaded', () => {
    // Р»РμРјРμРЅС‚С‹ Нын Р°РЅРёРјР°С†РёРё РїСЂРё Р°РіСЂСѓР·РєРµ
    установитьTimeout(() => {
        document.querySelector('.intro-content h1').style.opacity = '1';
        document.querySelector('.intro-content h1').style.transform = 'translateY(0)';

        установитьTimeout(() => {
            document.querySelector('.intro-content p').style.opacity = '1';
            document.querySelector('.intro-content p').style.transform = 'translateY(0)';
        }, 200);
    }, 500);

    // Ролик
    initDepthScrollEffect();

    // РќР°Р±Р»СЋР°С‚РμР»СЊ Р·Р° РїРѕСЏРІР»РμРЅРёРμРј СЌР»РμРјРμРЅС‚РѕРІ
    константный наблюдатель = новый IntersectionObserver((entries) => {
        записи.forEach(запись => {
            если (запись.пересекается) {
                entry.target.classList.add('видимый');
                наблюдатель.ненаблюдать(запись.цель);
            }
        });
    }, { порог: 0,2 });

    // Р”Р°РІР”РµРЅРёРµ СЌР”РµРµРµРЅС‚РѕРІ РЅР°Р±Р”СЋРґРµРЅРёСЏ
    document.querySelectorAll('.fade-in').forEach(element => {
        наблюдатель.наблюдать(элемент);
    });

    // РћР±СЂР°РѕС‚РєР° РєР»РёРєР° РїРѕ РЅР°РІРёР°С†РёРѕРЅРЅС‹Рј С‚РѕС‡Р°Рј
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const section = document.querySelectorAll('section');
            section[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Удаленный доступ РїСЂРѕРєСЂСѓС‚РєРµ
    updateActiveNavDot();
    window.addEventListener('scroll', updateActiveNavDot);
});

// РС„РµРєС‚ РіР»СѓР±РёРЅС‹ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ Рё РґРІРёР¶РµРЅРёРё РјС‹С€Рё
функция initDepthScrollEffect() {
    const container = document.querySelector('.container');
    const section = document.querySelectorAll('section');
    const shapes = document.querySelectorAll('.floating-shape');
    const gridItems = document.querySelectorAll('.grid-item');
    const слои = document.querySelectorAll('.parallax-layer');

    // Р¤Р¤Р•РљРў 1: РЈСЃРёР»МЦРЅРЅС‹Р№ РїР°СЂР°Р»Р°РєСЃ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;

        // РС„РμРєС‚ РґР»СЏ РїР»Р°РІР°СЋС‰РёС… С„РѕСЂРј РїРµСЂРІРѕР№ СЃРµРєС†РёРё - РЈРЎР˜Р›Р•РќР«Р™ Р¤Р¤Р•АљАў
        формы.forEach(форма => {
            const скорость = parseFloat(shape.getAttribute('скорость данных') || 0.1) * 2; // РЈРІРµР»РёС‡РёРІР°РµРј СЃРєРѕСЂРѕСЃС‚СЊ РІ 2 СЂР°Р·Р°
            const yPos = -(scrollTop * скорость);
            const zPos = parseFloat(shape.getAttribute('data-z') || -100) * 1.5; // Установим значение 1.5 Р°Р·Р°

            // РџСЂРјРµРЅСЏРµРј С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёСЋ СЃ СѓС‡РµС‚РѕРј РЅР°С‡Р°Р»СЊРЅС‹С… Нынешний РїСЂРѕРєСЂСѓС‚РєРц
            если (shape.classList.contains('shape-1')) {
                shape.style.transform = `rotate(${-15 - scrollTop * 0.02}deg) translateZ(${zPos}px) translateY(${yPos}px) scale(${1 + scrollTop * 0.0005})`;
            } иначе если (shape.classList.contains('shape-2')) {
                shape.style.transform = `rotate(${20 + scrollTop * 0.015}deg) translateZ(${zPos}px) translateY(${yPos}px) scale(${1 + scrollTop * 0.0003})`;
            } иначе если (shape.classList.contains('shape-3')) {
                shape.style.transform = `rotate(${10 - scrollTop * 0.01}deg) translateZ(${zPos}px) translateY(${yPos}px) scale(${1 + scrollTop * 0.0007})`;
            }
        });

        // Р¤Р¤Р•РљРў 2: Р¤Р¤Р•РљРў СЃРµРєС†РёРё
        const section2Top = section[1].offsetTop;
        const section2Bottom = section2Top + section[1].offsetHeight;

        если (scrollTop + window.innerHeight > section2Top && scrollTop < section2Bottom) {
            const sectionProgress = (scrollTop + window.innerHeight - section2Top) / section[1].offsetHeight;

            gridItems.forEach((элемент, индекс) => {
                константная задержка = индекс * 0,1;
                // РЈСЃРёР»РёРІР°РµРј СЌС„С„РµРєС‚ РіР»СѓР±РёРЅС‹ Ё РґРѕР±Р°РІР»СЏРµРј РІСЂР°С‰РµРёРµ
                const zPos = Math.sin((sectionProgress + задержка) * Math.PI) * 200; // Размер 200px
                const вращение = Math.cos((sectionProgress + задержка) * Math.PI * 2) * 15; // Уровни 15 дней

                // Р§РµС‚РЅС‹Рё РЅРµС‡РµС‚РЅС‹Рµ СЌР»РμРјРµРЅС‚С‹ НґРІРёР¶СѓС‚СЃСЏ РІ РїСЂРѕС‚РёРІРѕРїРѕР»РѕР¶РЅС‹С… РЅР°РїСЂР°РІР»МцРЅРёСЏС… СЃ СЂР°Р·РЅС‹Рј РІСЂР°С‰РµРёРёРц
                если (индекс % 2 === 0) {
                    item.style.transform = `translateZ(${zPos}px) rotateX(${rotation}deg) rotateY(${rotation}deg) scale(${1 + Math.abs(zPos) * 0.001})`;
                } еще {
                    item.style.transform = `translateZ(${-zPos}px) rotateX(${-rotation}deg) rotateY(${-rotation}deg) scale(${1 + Math.abs(zPos) * 0.001})`;
                }

                // Р˜Р·РјРµРЅСЏРµРј РЅРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ СІ Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ РіР»СѓР±РёРЅС‹
                item.style.boxShadow = `0 ${Math.abs(zPos) * 0.1}px ${Math.abs(zPos) * 0.3}px rgba(52, 152, 219, ${0.3 + Math.abs(zPos) * 0.002})`;
                const beforeElement = window.getComputedStyle(item, '::before');
                если (передЭлементом) {
                    item.style.setProperty('--opacity', 0.2 + Math.abs(zPos) * 0.002);
                }
            });
        }

        // Р¤Р¤Р•РљРў 3: Р”СЂР°РјР°С‚РёС‡РЅС‹Р№ РјРЅРѕРіРѕСЃР»РѕР№РЅС‹Р№ РїР°СЂР°Р»Р°РєСЃ РІ С‚СЂРµС‚СЊРµР№ СЃРµРєС†РёРё
        const section3Top = section[2].offsetTop;
        const section3Bottom = section3Top + section[2].offsetHeight;

        если (scrollTop + window.innerHeight > section3Top && scrollTop < section3Bottom) {
            const sectionProgress = (scrollTop + window.innerHeight - section3Top) / section[2].offsetHeight;

            слои.forEach((слой, индекс) => {
                константная скорость = (3 – индекс) * 0,4; // РЈРґРІР°РІР°РµРј СЂР°Р·РЅРёС†Сѓ РІ СЃРєРѕСЂРѕСЃС‚Рё РјРµР¶РґСѓ СЃР»РѕСЏРјРё
                const yPos = -(scrollTop - section3Top) * скорость;
                константный фактор вращения = (индекс + 1) * 2; // Р°Р·Р»РёС‡РЅРѕРµ РІСЂР°С‰РµРЅРёРµ НУГ СЃР»РѕСЏ
                константное вращение = Math.sin(scrollTop * 0.001) * rotateFactor;

                // РџСЂРёРјРµРЅСЏРµРј СЃРјРµС‰РµРЅРёРµ СЃ СЌРєСЃС‚СЂРµР°Р”СЊРЅС‹РјРё Н·РЅР°С‡РµРЅРёСЏРјРё Z На данный момент
                если (layer.classList.contains('layer-1')) {
                    layer.style.transform = `translateZ(-600px) scale(1.6) translateY(${yPos}px) rotateX(${rotation}deg) rotateY(${rotation}deg)`;
                } иначе если (layer.classList.contains('layer-2')) {
                    layer.style.transform = `translateZ(-300px) scale(1.3) translateY(${yPos * 0.8}px) rotateX(${rotation * 0.7}deg) rotateY(${rotation * 0.7}deg)`;
                } иначе если (layer.classList.contains('layer-3')) {
                    layer.style.transform = `translateZ(0) scale(1) translateY(${yPos * 0.6}px) rotateX(${rotation * 0.5}deg) rotateY(${rotation * 0.5}deg)`;
                } иначе если (layer.classList.contains('layer-4')) {
                    layer.style.transform = `translateZ(300px) scale(0.7) translateY(${yPos * 0.4}px) rotateX(${rotation * 0.3}deg) rotateY(${rotation * 0.3}deg)`;
                }
            });

            // Р”РѕР°РІР»СЏРµРј РІРѕР»РЅРѕРѕР±СЂР°Р·РЅС‹Р№ СЌС„С„РµРєС‚ РґР»СЏ РєСЂСѓРіРѕРІ
            document.querySelectorAll('.circle').forEach((circle, index) => {
                const waveSpeed ​​= индекс * 0,3;
                константная амплитуда волны = 20 + индекс * 10;
                const xOffset = Math.sin((scrollTop * 0.002) + waveSpeed) * waveAmplitude;
                const yOffset = Math.cos((scrollTop * 0.002) + waveSpeed) * waveAmplitude;

                circle.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${1 + Math.sin(scrollTop * 0.001) * 0.2})`;
            });
        }
    });

    // Р¤Р¤Р•РљРў 4: Р”СЂР°РјР°С‚РёС‡РЅС‹Р№ СЌС „С„РµРєС‚ РїСЂРё НґРІРёР¶РµРµРЅРё РјС‹С€Рё
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        // РС„РμРєС‚ НґР»СЏ РїР»Р°РІР°СЋС‰РёС… С„РѕСЂРј - РЈРЎР˜Р•РќРќРђРЇ Р•АђРљР¦Р˜РЇ
        формы.forEach(форма => {
            const Factor = parseFloat(shape.getAttribute('data-mouse-factor') || 20) * 1,5; // РЈСЃРёР»РёРІР°РµРј С‡СѓРІСЃС‚РІРёС‚РµР»СЊРЅРѕСЃС‚СЊ РІ 1.5 СЂР°Р°
            const rotX = mouseY * factor;
            const rotY = -mouseX * factor;
            const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            константный масштаб = 1 + расстояние от центра * 0,3; // Р˜Р·РјРµРµРЅРёРµ СЂР°Р·РјРµСЂР° РІ Р°РІРёСЃРјРѕСЃС‚Рё СЂР°СЃСЃС‚РѕСЏРёСЏ РєСѓСЂСЃРѕСЂР°

            // РџСЂРјРµРЅСЏРµРј РїРѕРІРѕСЂРѕС‚ СЃ СѓС‡РµС‚РѕРј РЅР°С‡Р°Р»СЊРЅС‹С… С‚СЂР°СЃС„РѕСЂРјС†РёР№ Рё РґРѕР±Р°РІР»СЏРµРј СЌС„РµРєС‚ Р°СЃС€С‚Р°Р±РёСЂРѕРІР°РёСЏ
            если (shape.classList.contains('shape-1')) {
                shape.style.transform = `rotate(-15deg) translateZ(-150px) translate(${mouseX * -30}px, ${mouseY * -30}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
            } иначе если (shape.classList.contains('shape-2')) {
                shape.style.transform = `rotate(20deg) translateZ(-225px) translate(${mouseX * 50}px, ${mouseY * 50}px) rotateX(${rotX * 0.8}deg) rotateY(${rotY * 0.8}deg) scale(${scale * 0.9})`;
            } иначе если (shape.classList.contains('shape-3')) {
                shape.style.transform = `rotate(10deg) translateZ(-120px) translate(${mouseX * -60}px, ${mouseY * -60}px) rotateX(${rotX * 1.2}deg) rotateY(${rotY * 1.2}deg) scale(${scale * 1.1})`;
            }
        });

        // РС„РμРєС‚ НґР»СЏ РІСЃРμР№ СЃС‚СЂР°РЅРёС†С‹ - Р»МкРіРєРёР№ РЅР°РєР»РѕРЅ РІСЃРµРіРѕ СЃРѕХРµСЂР¶РёРјРѕРіРѕ
        контейнер.стиль.преобразование = `перспектива(1000px) поворотX(${mouseY * 5}град) поворотY(${mouseX * 5}град)`;

        // РєСЃС‚СЂРµР°Р°Р№ СЌС„СЄРµРєС‚ НГР°СЂР°Р»Р°РєСЃ-РєРѕРЅС‚РµР№РЅРµСЂР° РІ С‚СЂРµС‚СЊРµР№ СЃРµРєС†РёРё
        const parallaxContainer = document.querySelector('.parallax-container');
        если (параллаксКонтейнер) {
            parallaxContainer.style.transform = `rotateX(${mouseY * 20}deg) rotateY(${mouseX * 20}deg)`;

            // Р”Р°Р°РІР”СЏРµРј РґРІРёР¶РµРЅРё РєСЂСѓРіРѕРІ РІ Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ РїРѕР·РёС†РёРё Нынче
            document.querySelectorAll('.circle').forEach((circle, index) => {
                константный фактор = (индекс + 1) * 50;
                circle.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px) scale(${1 + Math.abs(mouseX) * 0.5 + Math.abs(mouseY) * 0.5})`;
            });
        }
    });

    // Р¤Р¤Р•РљРў 5: РЈСЃР¤Р•РљРў РїСѓР»СЊСЃР°С†РёРµР№
    анимировать фон();
}

// РђРЅРёРјР°С†РёСЏ С„РѕРЅР° СЃ РіСЂР°РґРёРµРЅС‚РѕРј - РЈРЅРЈР§РЁР•РќРќРђРЇ Р'Р•Р РЎР˜РЇ
функция animateBackground() {
    const section3 = document.querySelector('.section-3');
    если (!section3) вернуть;

    пусть оттенок = 0;
    пусть время = 0;

    функция updateGradient() {
        время += 0,01;
        оттенок = (оттенок + 0,5) % 360; // Низкий уровень

        // Р'РѕР»РμРμ РЅР°СЃС‹С‰РμРЅРЅС‹Рцё СЏСЂРєРёРμ С†РІРμС‚Р° СѓРІРμР»РёС‡РμРЅРЅРѕР№ РЅРµРїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊСЋ
        const color1 = `hsla(${hue}, 90%, 65%, 0.5)`;
        const color2 = `hsla(${hue + 180}, 90%, 65%, 0.5)`;

        // Р”Р°РІР”СЏРµРј СЌС„С„РµРєС‚ РїСѓР»СЊСЃР°С†РёРё РІСЃРµР№ СЃРµРєС†РёРё
        section3.style.background = `radial-gradient(circle at ${50 + Math.sin(time) * 10}% ${50 + Math.cos(time) * 10}%, #1a1a1a, #222)`;

        document.querySelectorAll('.circle').forEach((circle, index) => {
            константное смещение = индекс * 90;
            // Низкий уровень шума
            const extraColor = `hsla(${(hue + offset) % 360}, 90%, 65%, 0.6)`;
            circle.style.background = `radial-gradient(circle, ${color1}, ${extraColor} 60%, ${color2})`;

            // Нынешний вариант
            const baseScale = 1 + 0.2 * Math.sin((Date.now() / 800 + index) * Math.PI);
            const xMove = Math.sin(время + индекс) * 20;
            const yMove = Math.cos(время + индекс * 0,7) * 20;

            // РџСЂРёРјРµРЅСЏРµРј РЅРµ С‚РѕР»СЊРєРѕ РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёРц, Нё РїРµСЂРµРјРµС‰РµРЅРёРµ
            const currentTransform = круг.стиль.преобразование || '';
            если (!currentTransform.includes('перевести')) {
                circle.style.transform = `translate(${xMove}px, ${yMove}px) scale(${baseScale})`;
            }

            // Р˜Р·РјРµРЅСЏРµРј РёРЅС‚РµРЅСЃРёРІРЅРѕСЃС‚СЊ СЃРІРµС‡РμРµРёСЏ
            const glowIntensity = 0,5 + 0,3 * Math.sin(время + индекс);
            circle.style.boxShadow = `0 0 ${30 + Math.sin(время) * 20}px rgba(52, 152, 219, ${glowIntensity}),
                                      0 0 ${50 + Math.cos(время) * 30}px rgba(231, 76, 60, ${glowIntensity * 0.7})`;

            // Р”РёР°РёС‡РµСЃРєРё РјРµРЅСЏРµРј СЂР°Р·РјС‹С‚РёРµ
            circle.style.filter = `blur(${3 + Math.sin(время + индекс) * 3}px)`;
        });

        requestAnimationFrame(обновитьГрадиент);
    }

    обновитьГрадиент();
}

// Удаленный доступ
функция updateActiveNavDot() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const section = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');

    разделы.forEach((раздел, индекс) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // РџСЂРѕРІРμСЂРєР°, РЅР°С…РѕРґРёС‚СЃСЏ Р»Рё СЃРμРєС†РёСЏ РІ РІРёРґРјРѕР№ РѕР±Р»Р°С‚Рё
        если (scrollPosition + windowHeight * 0.5 > sectionTop &&
            scrollPosition + windowHeight * 0.5 < sectionTop + sectionHeight) {
            navDots.forEach(точка => точка.classList.remove('active'));
            navDots[index].classList.add('active');
        }
    });
}