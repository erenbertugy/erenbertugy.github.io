/**
 * Etiket adlarını URL'de kullanılacak ASCII slug'a çeviren yardımcı.
 *
 * Kural (tek yönlü ve belgelenmiş):
 * 1. Türkçe locale ile küçük harfe indir (İ → i, I → ı).
 * 2. Türkçe harfleri ASCII karşılıklarına çevir: ğ→g, ü→u, ş→s, ı→i, ö→o, ç→c.
 * 3. Kalan aksanları temizle, harf/rakam dışındaki her şeyi tireye dönüştür.
 * 4. Tireleri sadeleştir, baş/son tireleri at.
 *
 * Örnek: "Ağ" → "ag", "Protokoller" → "protokoller".
 * Paket kullanmaz; yalnızca standart JavaScript.
 */

export interface TagInfo {
	name: string;
	slug: string;
}

/** Etiket adını ASCII slug'a çevirir. Boş sonuç dönerse etiket geçersizdir. */
export function tagToSlug(tag: string): string {
	return tag
		.toLocaleLowerCase('tr')
		.replaceAll('ğ', 'g')
		.replaceAll('ü', 'u')
		.replaceAll('ş', 's')
		.replaceAll('ı', 'i')
		.replaceAll('ö', 'o')
		.replaceAll('ç', 'c')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

interface TagSource {
	data: {
		tags?: string[];
	};
}

/**
 * Tüm yazılardaki etiketleri toplar, slug üretir ve aynı slug'a düşen
 * farklı etiketleri build sırasında açık bir hatayla bildirir.
 * Aynı etiket birden fazla yazıda geçerse tek kayıt olarak döner.
 */
export function collectTags(posts: readonly TagSource[]): TagInfo[] {
	const labelsBySlug = new Map<string, string>();

	for (const post of posts) {
		for (const tag of post.data.tags ?? []) {
			const slug = tagToSlug(tag);

			if (!slug) {
				throw new Error(
					`Geçersiz etiket: "${tag}" için URL slug'ı üretilemedi. Etiket en az bir harf veya rakam içermeli.`,
				);
			}

			const existingLabel = labelsBySlug.get(slug);

			if (existingLabel !== undefined && existingLabel !== tag) {
				throw new Error(
					`Etiket slug çakışması: "${existingLabel}" ve "${tag}" etiketleri aynı "/etiket/${slug}" adresine düşüyor. Lütfen etiket adlarından birini farklılaştırın.`,
				);
			}

			labelsBySlug.set(slug, tag);
		}
	}

	return [...labelsBySlug]
		.map(([slug, name]) => ({ name, slug }))
		.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}
