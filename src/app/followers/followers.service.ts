import { Injectable } from '@angular/core';

interface FollowerData {
  string_list_data: { href: string, value: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class FollowersService {

  // Extraer href y convertirlo en { url }
  extractHrefAndValue(dataArray: FollowerData[]): { url: string }[] {
    return dataArray
      .map(item =>
        item.string_list_data.map(({ href }) => ({ url: href }))
      )
      .flat();
  }

  // Obtener seguidores en común
  getCommonFollowers(following: { url: string }[], followers: { url: string }[]): { url: string }[] {
    return following.filter(({ url }) =>
      followers.some(follower => follower.url === url)
    );
  }

  // Obtener los que no te siguen
  getNonFollowers(following: { url: string }[], followers: { url: string }[]): { url: string }[] {
    return following.filter(({ url }) =>
      !followers.some(follower => follower.url === url) // Verifica la ausencia en `followers`
    );
  }
}
