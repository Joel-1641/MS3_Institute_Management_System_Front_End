import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-testimonal',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './testimonal.component.html',
  styleUrl: './testimonal.component.css'
})
export class TestimonalComponent {
  // slides = [
  //   {
  //     text: "Please tell your friends or collegues about TemplateMo website. Anyone can access the website to download free templates. Thank you for visiting.",
  //     img: "testimonial-author.jpg",
  //     category: "Full Stack Master",
  //     name: "Claude David"
  //   },
  //   {
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Quis ipsum suspendisse ultrices gravid.",
  //     img: "testimonial-author.jpg",
  //     category: "UI Expert",
  //     name: "Thomas Jefferson"
  //   },
  //   {
  //     text: "Scholar is free website template provided by TemplateMo for educational related websites. This CSS layout is based on Bootstrap v5.3.0 framework.",
  //     img: "testimonial-author.jpg",
  //     category: "Digital Animator",
  //     name: "Stella Blair"
  //   }
  // ];

  slides = [
    {
      text: "I’m proud to teach our Full Stack Master course, which equips students with the comprehensive skills needed to become proficient full-stack developers. ",
      img: "testimonial-author.jpg",
      category: "Full Stack Master",
      name: "Joel"
    },
    {
      text: "I’m thrilled to guide students through the process of creating visually engaging and user-friendly interfaces.",
      img: "testimonial-author.jpg",
      category: "UI Expert",
      name: "Hanilia"
    },
    {
      text: "I take great pride in teaching students the art and technique of creating captivating animations.",
      img: "testimonial-author.jpg",
      category: "Digital Animator",
      name: "Reka"
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

