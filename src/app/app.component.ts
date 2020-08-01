import { Component, ViewChild } from "@angular/core";
import {
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { NgbCarousel } from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from "./_modal";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  imageItemToDisplay: any = {};
  popupVisible = false;
  belowImageData;
  confirm: boolean;
  modalEvent: any;
  @ViewChild("carousel", { static: false }) carousel: NgbCarousel;

  constructor(private modalService: ModalService) {
    this.belowImageData = JSON.parse(JSON.stringify(this.imagens));
    this.belowImageData.splice(0, 1);
  }

  change(imagens) {
    this.belowImageData = JSON.parse(JSON.stringify(this.imagens));
    this.belowImageData.splice(imagens.current, 1);
  }

  imagens = [
    {
      Imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTf1o-AFoAkmI67HKwwnC2KFeSOZGtcA7aRaA&usqp=CAU"
    },
    {
      Imagem:
        "https://www.infosys.com/content/dam/infosys-web/en/insights/Images/open-source-adoption-lrg.jpg"
    },
    {
      Imagem:
        "https://www.sdxcentral.com/cdn-cgi/image/w=388,h=207,fit=scale-down,f=auto,q=85/https://www.sdxcentral.com/wp-content/uploads/2019/05/41602824_s.jpg"
    },
    {
      Imagem:
        "https://saschpe.files.wordpress.com/2017/06/cropped-background-4096x2048.jpg"
    }
  ];
  imagens2 = this.imagens.map(x => ({ ...x }));

  openModal(event: CdkDragDrop<string[]>, id: string) {
    this.modalService.open(id);
    this.modalEvent = event;
    console.log(this.modalEvent);
  }

  closeModal(id: string, flag) {
    console.log("flag", flag);
    this.confirm = flag;
    if (this.confirm) {
      console.log(this.modalEvent);
      if (this.modalEvent.previousContainer === this.modalEvent.container) {
        moveItemInArray(
          this.modalEvent.container.data,
          this.modalEvent.previousIndex,
          this.modalEvent.currentIndex
        );
      } else {
        const imagen = {
          ...(this.modalEvent.container.data[
            this.modalEvent.currentIndex
          ] as any)
        };
        const previousImagen = {
          ...(this.modalEvent.previousContainer.data[
            this.modalEvent.previousIndex
          ] as any)
        };
        this.modalEvent.container.data.splice(
          this.modalEvent.currentIndex,
          1,
          previousImagen
        );
        this.modalEvent.previousContainer.data.splice(
          this.modalEvent.previousIndex,
          1,
          imagen
        );
      }
      this.modalService.close(id);    
    } else {
      this.modalService.close(id);
    }
  }
}