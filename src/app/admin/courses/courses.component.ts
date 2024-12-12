import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../services/course.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pipes } from '../../pipes/search-filter.pipe';
import { NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxPaginationModule, Pipes],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  searchText: string = '';
  courses: Course[] = []; // All courses data
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 10; // Number of items per page
  paginatedCourses: any[] = []; // Paginated courses
  totalItems: number = 0; // Total number of courses
  isLoading: boolean = true; // To show loading indicator
  errorMessage: string = ''; // For error handling
  selectedCourseType: string = '';
  filteredCourses: any[] = []; // Filtered courses, if needed for other operations

  

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // this.loadCourses();
    this.fetchCourses();
  }

  // Fetch courses from the backend
  fetchCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data; // Store all courses
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses. Please try again later.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }
  get totalPages(): number {
    return Math.ceil(this.courses.length / this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  // Update courses based on search or type filter (optional, just in case you want to store filtered results)
  // updateFilteredCourses() {
  //   this.filteredCourses = this.courses; // This line isn't strictly needed, as filtering happens in the template
  // }
  // private loadCourses(): void {
  //   this.isLoading = true;
  //   this.errorMessage = ''; // Reset the error message
  //   this.courseService.getCourses().subscribe({
  //     next: (courses) => this.handleSuccess(courses),
  //     error: (error) => this.handleError(error),
  //   });
  // }

  // ngOnInit(): void {
  //   this.fetchCourses();
  // }

  // fetchCourses(): void {
  //   this.courseService.getCourses().subscribe({
  //     next: (data) => {
  //       this.courses = data;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Failed to load courses. Please try again later.';
  //       console.error(error);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // Delete a course
  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          alert('Course deleted successfully!');
          this.fetchCourses(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting course:', err);
        },
      });
    }
  }

  // Calculate paginated courses based on the current page
  // updatePaginatedCourses(): void {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.courses = this.courses.slice(startIndex, endIndex);
  // }

  // Navigate to the previous page
  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updatePaginatedCourses();
  //   }
  // }

  // Navigate to the next page
  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.updatePaginatedCourses();
  //   }
  // }

  // Calculate the total number of pages
  // get totalPages(): number {
  //   return Math.ceil(this.courses.length / this.itemsPerPage);
  // }
}

//   courses = [
//     { image:'https://th.bing.com/th/id/OIP._Lm_T3scKhVEVFC54gcRxwHaE8?w=279&h=186&c=7&r=0&o=5&pid=1.7',
//       name: 'Java',
//       fee: 2000,
//       level:"bigginer",
//       description:"dsfcdcdc",
//       offer: '10%'
//     },
//     { image:'data:image/jpeg;base64,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',
//       name: 'C#',
//       fee: 2000,
//       level:"bigginer",
//       description:"dsfcdcdc",
//       offer: '10%'
//     },
//     { image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC0AKkDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUHAwQGAQgC/8QAURAAAQMDAAMIDAYPCAMAAAAAAQACAwQFEQYSIRMWMVFUcZLSFBUiQVJTgZGTobHBB0JVYXKiJDIzNDY3YmR1gqO0tdHhJTVDc3SUsrMjY8L/xAAbAQEAAgMBAQAAAAAAAAAAAAAABQYCAwQHAf/EADURAAEDAgEICQMFAQEAAAAAAAEAAgMEEQUSFCFSYZGx0QYVIjEyUVNxoRNBwSMzgeHwQmL/2gAMAwEAAhEDEQA/ALbRERET+iJ/REXy1pD/AH/pJ+l7n+8yL6R0cBGj2jGe9ZrXn/axr5u0h/v/AEj/AEvc/wB5kUcJJBjD37ODDiiLLWffdZ/qJ/8AmVZnwsfemgY7/Ydd/wAKNVYvq6jZG+it+s1rsUlPjWaDjMbeNEXyiisX4XWsbpFbA1rWjtJT7GgAffVTxLqvgijjdo9dC5jHHtzMMuaCfvWn4wiKDb+JyX/Vj+KNVZ0dXVUFXSVtLIY6ilmjnhePivjcHDI4uMK//hJa1uhl5DQGjdLecNAA21kR4AqGtttrLrPJS0bdeobTVNSyPbrSinjMzmMAH2xAOB3+Dvoiuy7fCBRR6HU95onMbcrkx1HTQZDjT1rQBM5wPejzkbNuW7O7VDkucS5xJcSSSTkknaSSVkghqKqanpYGvllmmZDTxM2l8srgxrWjjJwFkuFHLbq6voJnMdNRVM9JK6PJYZIXmN2qSAcZBxsRFaemX4stB+ex/wAOmUL8En4T1f6Hq/8Avp1NaZfiy0H57H/DplC/BJnfPV8OyzVWcf59PwoivZE2oiIiIiIiIiIiIiIn9EREXy1pBg37SMg7O29z/eZF9FaM09KdHdFXbjCXGy2p2tubM57GjOc4UoaSicSTTU5JJJJijJJPCTkLMAGhrWgBrQA0DAAAGwABEXydV47Kq8Yx2RNjHBjXPBhfVVD95UH+lpv+tq9NHQnOaWmOTtzFHt9Sz8HBhEVG/C/+Eds/QlP+9VK6v4IPweuv6am/dadWHJT00rg6WGF7gMAyMY444suC9jihiBbFHHG0kkiNrWgngzhoRFyPwl43m3n55Lfj/dxKq/gy/DC0/wCTcMf7WRfQb2RyNLJGMew8LXgOacbeA7F+GU1JG4PjggY8AgOZGxrhnYdoGURcrbtBbVb9KLhpCwMMcrd0oqUNwymqZs7vIBjH0B3tc7NgxR2lH4TaVfpu6/vMi+oFhdSUTi5zqanLnElxMUZJJ75JCIqp0z/FnoP85sf8OmVSsklidrRyPY4jGWOLTjiyF9ZOhgexsb4onRsxqscxpa3AwMNIwvx2HQ8lpvQx/wAkRfKvZdacg1NRggg5lk4udfUdnJNpspJyTbqEkk5zmBm3Kz9h0HJab0Mf8lnAAAAAAGAANgAHeCIiIiIiIiIiIiIoq+3Ke1UcdVDFHK41DIXNkLgA1zXHPc8wXN79LhyKl6cqnNK2a9mqT4qWmk/ahnvVcqFrqiWKWzDYWVuwahpqmnLpW3IJH32Lqt+lw5FS9OVN+lw5FS9OVcqi4c9n1uCmOqKL0/k811W/S4cipenKm/S4cipenKuVRM9n1uCdUUXp/J5rqt+lw5FS9OVN+lw5FS9OVcqiZ7PrcE6oovT+TzXVb9LhyKl6cqb9LhyKl6cq5ZrXOzqjOOZfrcpfB9YXzPptbgnVNFqfJ5rp9+lw5FS9OVN+lw5FS9OVcxuUvg+sJuUvg+sJn02twTqmi1Pk810+/S4cipenKm/S4cipenKuY3KXwfWE3KXwfWEz6bW4J1TRanyea6ffpcORUvTlTfpcORUvTlXMblL4PrC/H80z2Y/9cE6povT+TzVi6P3uqvDq/dYIYm0wg1dyc8lzpNfOdbmU8uS0JZimusnhVUTOhED711qn6RznwhzjpKpOJxxxVT2RCwFuARERdSj0RERFFaQs3SzXVvFBuno3tf7lWKti5s3S3XSPGS+iqmjnMbsKphtA5goLFB22nYrp0ddeJ7fI/j+l6iLYpKKtrpHx0kJlexgkeA+NuGk6ue7IUUGlxsFZHvawZTjYLXRSm9/SDkLvTU/XTe/pByF3pqfrrb9CXVO5c+e03qN3hRaKU3v6Qchd6an66b39IOQu9NT9dPoS6p3JntN6jd4WjBwv5h7VnW5Bo/pBl/2C7gH+NT8f01sb37/yF3pafrrQ+nmJ8B3FazW01/3G7wotFJ737/yF3pafrpvfv/IXelp+usM2m1DuK+Z7Teo3eFGIpPe/f+Qu9LT9da1XbrjQiJ1XAYhIXNZl8bsloBP2jivjoJWi7mkD2WbKqB7g1rwT7haq0luO2NcfyT7FppGupq7/AENZq2mR2PutdUu8jQyP3LpFCaKs1LFbz4w1MvSneQptXCmFoWjYvNcQdlVUh2niiIi6FwoiIiL8SM12SM7z2PYf1gQqfxjZxbPNsVx8SqKqZuVVWR+LqahnRkcFDYoNDT7q19HHaZG+35WFT2ir9W6Ss8ZRTDytfG5QKldHXat5ovy2VMfnic73KMpjaZp2hWLEG5VLINhVgIixzzwU0MtRO/UhiAL36rnYBcGjYwE8JHeVrJA0leZgFxsO9ZNiKK3w6P8ALf2FR1F7vh0f5aPQVHUWr68WsN4XTmVT6btxU1T8L+Ye1bCgoNIdH8v+ze8P8Go4/oLPvhsHLf2M/UXzOIdcbwmZ1Ppu3FSyKJ3w2Dlv7GfqJvhsHLf2M/UXzOIdcbwmZ1Hpu3HkpZclpe/u7XHxNqXnymMBS++Gwct/Yz9RcxpFXUlfV0z6WXdIo6fULtV7e7L3EjDwDxLhxCeN1O4NcCdH32qUwmlmbVtc9hAF+8HyUHJsY/mWqtmX7m758D1rUfsZIeJrvYVXWdyvbFadhj3Oy2Zv5nC7pt1/epJa9CzcqKgj8XS07OjG0LYV1jFmAbF5ZO7Llc7zJRERZrSiIiIiqu8s1Ltd2/nk7um7X96tRVppMzUvdyA4HGCQfrQsyovExeMHarH0edaoc3zH5Ch1vWd+pdrQ786Yw8z2uZ71orNSP3OroJPAq6V3kErVBxnJeDtVynblxOb5g8FZ60bwzdLTdm/mkj+gQ/3LePCedYaqMy0tbEBky0tRG0DhLnxuaArbIMppC8vhdkSNd5EKsEUgLJf8D+zajgHfh66dpL98nVHnh66qf0ZNU7ivTc6g9Ru8c1qwcL+Ye1Z1swWS/Zf/AGdUcA78XH9NZ+0t9+TqjzxddaXwS38J3FYGqg9Ru8c1Hot/tLffk6o88XXTtLffk6o88XXWH0JdQ7ivmdQa7d45rQRb/aW+/J1R54uutOWKWCSSGVhZLG7Ve04Ja7iOCR61i6N7NLmkfws2TRyGzHA+xBWvMe4HzuC18F5awfHeyPpuDVnn4Gc5XtCzda+2R+MrqRvk3ZpK2xC9gtxdkNLvJW2AAABwAYHk2In9UV1XlCIiIiIiIiKvNL2at31vG0lO/wAxez3Kw1wumjMVtvk8OkezoSE+9R+IC8BO0KcwJ1qsDzB5/hcsvCdUa3g4d0dq9XjhlrhxtI84VcV+Vqg6wDvCAd5xleqIpr5ZBTUgkromyCCESNLZsteGAEHDMLL29sHyhD0JuoraJ47eIb15g6jqASBG7cVJIo3t7YPlCHoTdRO3tg+UIehN1F9+tFrDeFjmlR6btx5KYp+F/MPathQsF+sAL/s+I7BwNl4/nas/b6w8ui6MnVXzOItYbwmaT+mdxUmijDf7CMns6LoydVSeQdvGs2SMf4SCtUkMkfjaR7iyHmVZ3J+vcLk/vGsqMcwkICsziVWSu3SWV/hySP6TiVDYweywKx9Hm9uR2wf74WrPwsHzErbsbN0vNmbxVQf6Nj3+5ac324+Zo9qlNF2a18oTjZHFVSeaIs96i6YXewbRxVoq3ZNNI7/yeCsocAREVwXmCIiIiIiIiLjtNmdzaJOJ1Uw+URuHsK7FcvpozNvopO+ytDfI+J/8lyVovA5SeEuyayM/7uK4RERVdejrdhtV4qIo54KKWSGQF0b2uiAcASMjWeD6l++0l/8Ak6fpQ9ddbo27Xs9H+Q+pj5tWZx96mFNRYfG9gfc6QqjU47PDM+INGgkffmqumhnp5ZIJ43RzRkNkY7GWkgHBwSFjUvpIzVvNYfDZTSeeFoPsUQomVmQ8t8irPTSmaFkh+4BWaDhfzD2rPtWCDhfzD2rOuN/eth71+mNL5IGeMmhj6Tw1Wp/VVnbm69xtbPCrabPM14efYrMU9g47Lz7Kn9IXduNuw/74WKofucFRJ4uGV/RYSqtHAOYKyrq/c7bc3cVJUAc7mFoVbLVjB7TB7ro6PNsyR20LWm+6HmCntDma12md4qglPMXyRt/mufk2vfzrqdCY81V2l8GCljH6z5He5c1ELzMCmMUdk0Uh2cSAu4REVrXnCIiIiIiIiLn9LWa9nkd4qpppPO7U966BRGkjNeyXQeDHG/oSsd7loqBeJw2FdlC7JqYztHFVmiIqmvTl2uibs22dmfudbMOkxj/eugXMaIPBiucORrbvDI1uRkh0eqSBw95dP8ytFGbwNXnGKtyayQbeIUJdrAy5z9lNqnwzbkyItMbXxEMzgnBDs+Vc9UaNXuDJjjiqGjv08gDuhJqn1ld4ixloopSXHQVspsYqadoYCCB9iP8AFVtFS1zJnQvpKoSkbIzBLrHb3gGqWp9Hr7UYPYzYGn41U8MPQbl3qXcwcLtveC2FyDCY8q7nErtk6QTOHYYAd65u3aMdiVFNVz1ZkkgfujY4owyPW1S3aXEuPD8y6REypKGCOBuTGLKEqKqWpdlym5UXpA7UtFw/KbEzpSsaq9Xc6USBtsLMgOlngAaSMkNJeSBw95cMq9ixvMBs5q24A21MT5n8BabjlzvpH2rs9CGYivEnhT08fQjLv/pcWdq73QtmLXUv78lfMfIxkbPcssPF5hsXVjjrUbh5kcV0yIisq8/RERERERERaN2ZulruzOOiqSOcRlwW8sc7N1gqI/GQyM6TSFi4XaQs43ZLw7yKqBF4OAcwXqpy9XQZBBBwRwEHBHMQpKmvl7pcCOskewY7ioxM3HF/5MnzFRqLJr3MN2my1Swxyi0jQfcLqqfS52wVdE08b6V5aehJkfWUvT3+x1OAKoRPPxKppiPSOWfWVfIu6PEJm9+lQ82BUsmll2nZ/atqnewtdIHsMZaCHtc0sxx6wOPWtaovlmpsh9XG9w+JBmV2eLuMjzlVpTkjXaCdUgEtydUnPfHAs6zkxZw0MauFnR5gd+o8kbBbmusqNLm7RSUhPE+pcB9SPP8AyUPUX+91GQaoxNPxaYCID9Yd39ZRaKNkrZ5O927QpaHDKWHwsH86eK9c573Fz3Oc47S55LnHnJ2r8u2B3zAr3YOHZzrE+Rmq4A5JBAx/NcoBJUiB9gtdWNonHqWSkd42Wqk88zmj2KuVZ2jrNzslnbwZpWSekJf71OYYP1SdnJQPSF1qZrfN34KlURFYFR0RERERERERERFVtZZrxRvlMtDUbkHvLZIm7qzVycEmLOPLhRoIJIBGRwjvjnCuRadVbLVW57Ko6eUn4zmAP8j24d61DSYYDpY7erXB0iIAEzP5HI81VCLu6rQ22SZNLUVNO7OxriJ4/M/u/rKEqdEr5BkwiCqYM43J+5yY+hLgfWXDJRTM+1/ZTUOL0k3c+x26P6+Vz6LLUU1ZSHVqqeeA/wDujcxp5nEavrWJcZBGgqUa4OF2m4WaDhf9Ee1ZS9jeFw9p9S1NvzotZZc3S11nMze8CefYF+DNIeAgcy8hinqXalNDLO/waeN8h8uoCFMUui2kFTgviipWHbmpkBf6OLWPnIW6OBz/AANutEtRDB+64D3KhCSeEk868Lmt+2IHOQPau4pdC6JmDWVlROeEshDYI+bI1n/WCnaSz2Wiwaahp2PH+IW68vpJMu9akI8Nld4tCh5sfpmaIwXfA+eSramtl3rRmkoamQEHVeWbnFnvd3LhvrVn0ELqaioKd4AfBS08LwDkBzGBpwVsopWmpG09yDclVrEMTfXWBaAAiIi7FFIiIiIiIiIiIiIiIiIiIiL8ua1wLXAOaRghwBBHzg7FE1Wjlgqy4uo2RPPx6UmF3OQzufOERapWNc3tC6308skbxkOI9jZcZV2qmgvMNtZJPuL3saXuLDKA7J2HV1fqrr6bRfR+m1HGl7IfsOtWPdL9Q4Z9VEUTRRsdI64VpxeeVkEeS4i406e9TMccUTAyNjGMHA2Noa0cwbsX7RFNqn3vpKIiIiIiIiIiIiIiIi//2Q==',
//       name: 'HTML',
//       fee: 2000,
//       level:"bigginer",
//       description:"dsfcdcdc",
//       offer: '10%'
//     },
//     { image:'data:image/jpeg;base64,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',
//       name: 'Bootsrap',
//       fee: 2000,
//       level:"bigginer",
//       description:"dsfcdcdc",
//       offer: '10%'
//     },
//     { image:'https://th.bing.com/th/id/OIP.dLNBxINIoZfqGZeDNOs7WQHaHa?w=193&h=193&c=7&r=0&o=5&pid=1.7',
//       name: 'CSS',
//       fee: 2000,
//       level:"bigginer",
//       description:"dsfcdcdc",
//       offer: '10%'
//     },
//      { image:'https://th.bing.com/th/id/OIP.Klh1l7wkoG6PDPb9A5oCHQHaHa?w=160&h=180&c=7&r=0&o=5&pid=1.7',
//       name: 'Angular',
//       fee: 2000,
//       level:"bigginer",
//       description:"dsfcdcdc",
//       offer: '10%'
//     }
//   ];
// }
