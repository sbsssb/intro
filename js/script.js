document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas(); // 초기 크기 설정
    window.addEventListener('resize', resizeCanvas); // 창 크기 변경 시 캔버스 크기 조정

    const images = ["../media/leaf.png", "../media/leaf.png", "../media/leaf.png"]; // 이미지 파일 경로를 배열에 추가하세요
    const particles = [];

    class Particle {
        constructor(x, y, imageSrc) {
            this.x = x;
            this.y = y;
            this.image = new Image();
            this.image.src = imageSrc;
            this.size = 35; // 이미지 크기
            this.speedY = Math.random() * 3 + 2;
        }

        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            context.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
    }

    function init() {
        for (let i = 0; i < images.length; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particles.push(new Particle(x, y, images[i]));
        }
    }

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
