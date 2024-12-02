import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-owl-carousel',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, CarouselModule], // Import necessary modules
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.css']
})
export class OwlCarouselComponent {
  slides = [
    {
      text: "Please tell your friends or collegues about TemplateMo website. Anyone can access the website to download free templates. Thank you for visiting.",
      img: "testimonial-author.jpg",
      category: "Full Stack Master",
      name: "Claude David"
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Quis ipsum suspendisse ultrices gravid.",
      img: "testimonial-author.jpg",
      category: "UI Expert",
      name: "Thomas Jefferson"
    },
    {
      text: "Scholar is free website template provided by TemplateMo for educational related websites. This CSS layout is based on Bootstrap v5.3.0 framework.",
      img: "testimonial-author.jpg",
      category: "Digital Animator",
      name: "Stella Blair"
    }
  ];

  carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    navText: ["<", ">"],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 }
    }
  };
}
