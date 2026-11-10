/**
 * 글 목록. 첫 화면 아래 링크, 바닥글 「읽을거리」, sitemap, llms.txt가 이 순서를 쓴다. 처음
 * 온 사람에게 먼저 보일 글이 앞이다. 글 하나의 모양은 `article-page.mjs` 첫 주석.
 */

import optics from './optics.mjs';
import levels from './proven-unique.mjs';
import { prefix } from '../site.mjs';

export const ARTICLES = [optics, levels];
export const articlesIn = (lang) => ARTICLES.filter((a) => a.langs.includes(lang));
export const articlePathOf = (art, l) => `${prefix(l)}/${art.slug}/`;
