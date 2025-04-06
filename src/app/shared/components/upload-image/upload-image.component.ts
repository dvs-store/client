import { Component, ElementRef, EventEmitter, input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'upload-image',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-image.component.html'
})
export class UploadImageComponent {

  protected defaultImage = input<string>('https://imgs.search.brave.com/dAqi0hGUfUjEN-ppuOA6VR1IGCZwrE-q4ccnSfFE1DA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZHVwbGljaGVja2Vy/LmNvbS9uZXdhc3Nl/dHMxL2ltYWdlcy9m/YWNlLXNlYXJjaC91/cGxvYWRfaW1nLnN2/Zw');
  @ViewChild('inputImage') input!:ElementRef<HTMLInputElement>;
  private file = signal<File | null>(null);
  protected uploadImage = signal<string | null>(null);

  @Output()
  public onChangeImage = new EventEmitter<{file:File, base64: string} | null>();


  protected onClick(){
    this.input.nativeElement.click();
  }

  protected onUploadImage(event:Event){
    const input = event.target as HTMLInputElement;

    if( input.files && input.files.length > 0 ){
      const file = input.files[0];
      this.file.set(file);

      this.decodeBase64(file);
    }
  }

  private decodeBase64(file:File){
    const reader = new FileReader();
    reader.onload = () => this.uploadImage.set(reader.result as string);
    this.onChangeImage.emit({file, base64: reader.result as string});

    reader.readAsDataURL(file);
  }

  protected onReset(){
    if(!this.uploadImage()) return;
    this.uploadImage.set(null);
    this.input.nativeElement.value = '';
  }

}
