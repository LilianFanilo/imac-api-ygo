<script setup lang="ts">
  useHead({
    title: "About Yu-Gi-Oh Cards Database",
    meta: [
      {
        name: "description",
        content:
          "The application was designed to provide a seamless and interactive user experience centered around Yu-Gi-Oh! card data, with real-time data, interaction and customization, seamless experience, and local storage.",
      },
    ],
  });
</script>
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
      <H2>Key Features</H2>
      <p>
        The application was designed to provide a seamless and interactive user
        experience centered around
        <span class="font-bold">Yu-Gi-Oh! card data</span>:
      </p>
      <ul class="list-disc list-inside flex flex-col gap-y-4px">
        <li>
          <strong>Real-time data:</strong> The information presented comes
          directly from an external API.
        </li>
        <li>
          <strong>Interaction and customization:</strong> You can easily
          interact with the displayed data using advanced sorting, ordering, and
          filtering features.
        </li>
        <li>
          <strong>Seamless experience:</strong> Enjoy fast multi-page navigation
          and visual animations that react to your actions.
        </li>
        <li>
          <strong>Local storage:</strong> Your sorting filters are persistently
          saved directly in your browser to enhance your next visit.
        </li>
      </ul>

      <H2>Technical Aspects</H2>
      <p>
        This project was built adhering to modern web development standards:
      </p>
      <ul class="list-disc list-inside flex flex-col gap-y-4px">
        <li>
          <strong>Modular architecture:</strong> The code is smartly divided
          into clean and reusable <em>Single File Components</em> (SFCs).
        </li>
        <li>
          <strong>Maintainable code:</strong> A strict project architecture and
          rigorous English naming conventions ensure the clarity and longevity
          of the code.
        </li>
        <li>
          <strong>Responsive Design:</strong> The interface adapts to all
          screens (computers, tablets, smartphones) and is built around a clear
          structure featuring a header and footer.
        </li>
        <li>
          <strong>Dynamic rendering:</strong> Extensive use of Vue.js
          conditional and iterative directives for an optimized display of data
          tables.
        </li>
      </ul>
    </section>
  </LayoutsMain>
  <LayoutsFooter />
</template>
