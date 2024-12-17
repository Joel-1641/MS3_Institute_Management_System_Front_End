import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonal',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonal.component.html',
  styleUrl: './testimonal.component.css',
})
export class TestimonalComponent {
  slides = [
    {
      text: "As a UX instructor at IT Scholar, I’ve witnessed incredible growth in our students. The program encourages creativity and critical thinking, and I’m proud to provide feedback that helps refine their designs and user-focused approaches. It’s rewarding to see them excel in creating impactful, user-friendly solutions.",
       img: 'testimonial-author.jpg',
      category: 'UX Teacher',
      name: 'Thushanthini',
    },
    {
      text: "As a UI expert, I’m impressed with IT Scholar’s focus on detail and user-centric design principles. Their feedback is precise, emphasizing practical improvements that enhance both functionality and aesthetics. It's a great place for aspiring designers to refine their craft.",
       img: '/member-03.jpg',
      category: 'UI Expert',
      name: 'Joel',
    },
    {
      text: "As a Digital Animator, IT Scholar has been a game-changer for me. The feedback from the mentors is precise and creative, helping me refine my techniques and bring my animations to life with a professional touch.",
      img: '/member-01.jpg',
      category: 'Digital Animator',
      name: 'Reka',
    },
  ];

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    navText: ['<', '>'],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };
}
