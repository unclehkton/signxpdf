<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { authorityPath, CORE_SEO_LOCALES, DEFAULT_LOCALE, seoLocaleFromPathname, toolPath } from '$lib/seo/site';
  import type { CoreSeoLocale, SeoLocale } from '$lib/seo/types';

  $: pathname = $page?.url?.pathname ?? '/en/';
  $: seoLocale = (seoLocaleFromPathname(pathname) ?? DEFAULT_LOCALE) as SeoLocale;
  $: privacyHref = toolPath(seoLocale, 'privacy');
  $: authorityLocale = (CORE_SEO_LOCALES as readonly string[]).includes(seoLocale)
    ? (seoLocale as CoreSeoLocale)
    : (DEFAULT_LOCALE as CoreSeoLocale);
  $: verificationHref = authorityPath(authorityLocale, 'verification');
  $: aboutHref = authorityPath(authorityLocale, 'about');
</script>

<footer class="site-footer">
  <p class="footer-copy">{$t('layout.footer')}</p>
  <nav class="footer-links" aria-label="Footer">
    <a class="footer-link" href={privacyHref}>{$t('layout.privacy')}</a>
    <a class="footer-link" href={verificationHref}>{$t('layout.verification')}</a>
    <a class="footer-link" href={aboutHref}>{$t('layout.about')}</a>
    <a class="footer-link" href="/open-source-licences/">{$t('layout.openSourceLicences')}</a>
  </nav>
</footer>

<style>
  .site-footer {
    max-width: var(--max-content);
    margin: 0 auto;
    padding: 1.25rem 1rem 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;
    justify-content: space-between;
    color: var(--muted);
    font-size: 0.85rem;
    border-top: 1px solid var(--border);
  }

  .footer-copy {
    margin: 0;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;
  }

  .footer-link {
    color: var(--green-800);
    text-decoration: none;
    font-weight: 600;
  }

  .footer-link:hover {
    text-decoration: underline;
  }
</style>
