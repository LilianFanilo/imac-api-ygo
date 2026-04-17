<template>
  <LayoutsNavbar />
  <LayoutsMain>
    <div class="col-span-full">
      <H1>About the project</H1>
    </div>
    <div
      class="rounded-2xl col-span-full md:col-start-1 md:col-end-6 h-125 bg-gray-100 bg-cover bg-right bg-x-left bg-[url(/img/aboutImg.webp)]"
    ></div>
    <section
      class="col-span-full md:col-start-6 md:col-end-13 flex flex-col gap-y-20px"
    >
      <H2>Les fonctionnalités clés</H2>
      <p>
        L'application a été pensée pour offrir une expérience utilisateur fluide
        et interactive autour de la donnée
        <span class="font-bold">de cartes Yu-Gi-Oh!</span>
        :
      </p>
      <ul class="list-disc list-inside flex flex-col gap-y-4px">
        <li>
          <strong>Données en temps réel :</strong> Les informations présentées
          proviennent directement d'une API externe.
        </li>
        <li>
          <strong>Interaction et personnalisation :</strong> Vous pouvez
          facilement interagir avec les données présentées grâce à des
          fonctionnalités avancées de tri, d'ordonnancement et de filtrage.
        </li>
        <li>
          <strong>Expérience fluide :</strong> Profitez d'une navigation
          multi-pages rapide et d'animations visuelles qui réagissent à vos
          actions.
        </li>
        <li>
          <strong>Sauvegarde locale :</strong> Vos filtres de tri sont stockées
          de façon persistante directement sur votre navigateur pour améliorer
          votre prochaine visite.
        </li>
      </ul>

      <H2>L'aspect technique</H2>
      <p>
        Ce projet a été construit en respectant les standards modernes du
        développement web :
      </p>
      <ul class="list-disc list-inside flex flex-col gap-y-4px">
        <li>
          <strong>Architecture modulaire :</strong> Le code est intelligemment
          découpé en <em>Single File Components</em> (SFC) propres et
          réutilisables.
        </li>
        <li>
          <strong>Code maintenable :</strong> Une architecture de projet stricte
          et un nommage rigoureux en anglais garantissent la clarté et la
          pérennité du code.
        </li>
        <li>
          <strong>Design Responsive :</strong> L'interface s'adapte à tous les
          écrans (ordinateurs, tablettes, smartphones) et s'articule autour
          d'une structure claire avec en-tête et pied de page.
        </li>
        <li>
          <strong>Rendu dynamique :</strong> Utilisation poussée des directives
          conditionnelles et itératives de Vue.js pour un affichage optimisé des
          tableaux de données.
        </li>
      </ul>
    </section>
  </LayoutsMain>
  <LayoutsFooter />
</template>
