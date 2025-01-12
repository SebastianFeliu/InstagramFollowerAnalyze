import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StringListData {
  href: string;
  value: string;
}

interface DataItem {
  string_list_data: StringListData[];
}

interface RelationshipsFollowing {
  title: string;
  media_list_data: any[];
  string_list_data: StringListData[];
}

interface FollowingData {
  relationships_following: RelationshipsFollowing[];
}

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FollowersComponent {
  followersFileName: string | null = null;
  followingsFileName: string | null = null;
  commonFollowers: any[] = [];
  nonFollowers: any[] = [];
  followersData: any[] = [];
  followingsData: any[] = [];

  // Paginación para Seguidores en común
  commonFollowersPageSize: number = 100;
  commonFollowersCurrentPage: number = 1;

  // Paginación para No te siguen
  nonFollowersPageSize: number = 100;
  nonFollowersCurrentPage: number = 1;

  pageSizeOptions: number[] = [10, 100, 1000];

  onFileChangeFollowers(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.followersFileName = input.files[0].name;
      this.readFile(input.files[0]).then((data) => {
        this.followersData = this.extractHrefAndValue(data);
        this.updateTables();
      });
    }
  }

  onFileChangeFollowings(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.followingsFileName = input.files[0].name;
      this.readFile(input.files[0]).then((data) => {
        this.followingsData = this.extractHrefAndValueFromFollowing(data);
        this.updateTables();
      });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onDropFollowers(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.followersFileName = files[0].name;
      this.readFile(files[0]).then((data) => {
        this.followersData = this.extractHrefAndValue(data);
        this.updateTables();
      });
    }
  }

  onDropFollowings(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.followingsFileName = files[0].name;
      this.readFile(files[0]).then((data) => {
        this.followingsData = this.extractHrefAndValueFromFollowing(data);
        this.updateTables();
      });
    }
  }

  readFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsedData = JSON.parse(reader.result as string);
          resolve(parsedData);
        } catch (error) {
          reject("Error al leer el archivo JSON.");
        }
      };
      reader.onerror = () => reject("Error al leer el archivo.");
      reader.readAsText(file);
    });
  }

  updateTables(): void {
    if (this.followersData.length && this.followingsData.length) {
      this.commonFollowers = this.getCommonFollowers(this.followingsData, this.followersData);
      this.nonFollowers = this.getNonFollowers(this.followingsData, this.followersData);
    }
  }

  extractHrefAndValue(dataArray: DataItem[]): any[] {
    return dataArray
      .map(item => item.string_list_data.map(({ href, value }) => ({ url: href, value })))
      .flat();
  }

  extractHrefAndValueFromFollowing(data: FollowingData): { url: string; value: string }[] {
    if (!data.relationships_following || !Array.isArray(data.relationships_following)) {
      throw new Error("El JSON no tiene la estructura esperada.");
    }
  
    return data.relationships_following
      .map(item =>
        item.string_list_data.map(({ href, value }) => ({
          url: href,
          value: value,
        }))
      )
      .flat();
  }

  getCommonFollowers(following: any[], followers: any[]): any[] {
    return following.filter(({ url }) =>
      followers.some(follower => follower.url === url)
    );
  }

  getNonFollowers(following: any[], followers: any[]): any[] {
    return following.filter(({ url }) =>
      !followers.some(follower => follower.url === url)
    );
  }

  onCommonFollowersPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.commonFollowersPageSize = Number(selectElement.value);
      this.commonFollowersCurrentPage = 1;
      this.updateTables();
    }
  }

  onNonFollowersPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.nonFollowersPageSize = Number(selectElement.value);
      this.nonFollowersCurrentPage = 1;
      this.updateTables();
    }
  }

  getPaginatedData(data: any[], pageSize: number, currentPage: number): any[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }
  
  // Función para calcular el número total de páginas
  totalPages(data: any[], pageSize: number): number {
    if (data.length === 0 || pageSize === 0) {
      return 1;  // Para evitar la división por cero
    }
    return Math.ceil(data.length / pageSize);
  }

  onCommonFollowersPageChange(page: number): void {
    this.commonFollowersCurrentPage = page;
  }

  onNonFollowersPageChange(page: number): void {
    this.nonFollowersCurrentPage = page;
  }
}

