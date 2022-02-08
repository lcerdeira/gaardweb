<template>
  <q-page class="column">
    <div
      class="my-bg col-grow column"
      :class="$q.platform.is.mobile ? 'q-px-sm q-pt-md' : $q.screen.width < 875 ? 'q-px-sm q-pt-lg' : 'q-px-xl q-pt-lg'"
    >
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        control-color="white"
        infinite
        padding
        :navigation="$q.screen.width >= 875"
        :arrows="!$q.platform.is.mobile"
        class="bg-transparent rounded-borders full-height"
      >
        <q-carousel-slide
          v-for="(pub, index) in $q.screen.width < 875 ? pubCarousels4 : $q.screen.width < 1230 ? pubCarousels3 : $q.screen.width < 1600 ? pubCarousels2 : pubCarousels"
          :key="pub.toString() + index"
          :name="pub.name"
          class="column"
        >
          <div
            class="text-subtitle1 text-white my-info q-pa-sm q-my-lg"
            :style="{width: $q.screen.width < 875 ? '99.9%' : $q.screen.width < 1230 ? '48%' : $q.screen.width < 1600 ? '31.7%' : '23.2%'}"
          >
            Click publication to open
          </div>
          <div
            class="row col-grow"
            :class="'justify-between'"
          >
            <q-btn
              @click="p.doi !== ''? openURL(p.doi): ''"
              dense
              class="q-pa-sm my-card"
              style="height: 300px; textTransform: none"
              :style="{width: $q.screen.width < 875 ? '99.9%' : $q.screen.width < 1230 ? '48.8%' : $q.screen.width < 1600 ? '31.7%' : '23.2%'}"
              v-for="p in pub.publications"
              :key="p.title"
            >
              <div class="full-height full-width justify-between column no-wrap">
                <q-scroll-area class="full-width column col-11">
                  <q-card-section>
                    <div class="text-subtitle1 my-title q-pb-sm text-justify">{{p.title}}</div>
                    <div class="text-subtitle2 text-left q-pt-sm">{{p.authors}}</div>
                  </q-card-section>
                </q-scroll-area>
                <q-card-section v-if="$q.screen.width < 875" class="row justify-end q-pa-none q-mr-sm">
                  {{p.id}} / {{publications.length}}
                </q-card-section>
              </div>
            </q-btn>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div v-if="$q.platform.is.mobile" class="row items-center justify-center">
        <q-icon name="west" color="white" size="35px"></q-icon>
        <q-icon name="east" color="white" size="35px"></q-icon>
      </div>
    </div>
  </q-page>
</template>

<script>

const publications = [
  // Direct publications from project are,
  {
    title: 'Identification of a rapidly-spreading triple mutant for high-level metabolic insecticide resistance in Anopheles gambiae provides a real-time molecular diagnostic for anti-malarial intervention deployment',
    authors: 'Njoroge, H., et al. (2021)',
    content: 'The sustainability of malaria control in Africa is threatened by the rise of insecticide resistance in Anopheles mosquitoes, which transmit the disease. To gain a deeper understanding of how mosquito populations are evolving, here we sequenced the genomes of 765 specimens of Anopheles gambiae and Anopheles coluzzii sampled from 15 locations across Africa, and identified over 50 million single nucleotide polymorphisms within the accessible genome. These data revealed complex population structure and patterns of gene flow, with evidence of ancient expansions, recent bottlenecks, and local variation in effective population size.',
    doi: 'https://doi.org/10.1101/2021.02.11.429702'
  },
  {
    title: 'Identification of a rapidly-spreading triple mutant for high-level metabolic insecticide resistance in Anopheles gambiae provides a real-time molecular diagnostic for anti-malarial intervention deployment',
    authors: 'Njoroge, H., et al. (2021)',
    content: 'The sustainability of malaria control in Africa is threatened by the rise of insecticide resistance in Anopheles mosquitoes, which transmit the disease. To gain a deeper understanding of how mosquito populations are evolving, here we sequenced the genomes of 765 specimens of Anopheles gambiae and Anopheles coluzzii sampled from 15 locations across Africa, and identified over 50 million single nucleotide polymorphisms within the accessible genome. These data revealed complex population structure and patterns of gene flow, with evidence of ancient expansions, recent bottlenecks, and local variation in effective population size.',
    doi: 'https://doi.org/10.1101/2021.02.11.429702'
  },
  {
    title: 'A high throughput multi-locus insecticide resistance marker panel for tracking resistance emergence and spread in Anopheles gambiae',
    authors: 'Lucas, E. R., et al. (2019)',
    content: 'The sustainability of malaria control in Africa is threatened by the rise of insecticide resistance in Anopheles mosquitoes, which transmit the disease. To gain a deeper understanding of how mosquito populations are evolving, here we sequenced the genomes of 765 specimens of Anopheles gambiae and Anopheles coluzzii sampled from 15 locations across Africa, and identified over 50 million single nucleotide polymorphisms within the accessible genome. These data revealed complex population structure and patterns of gene flow, with evidence of ancient expansions, recent bottlenecks, and local variation in effective population size.',
    doi: 'https://doi.org/10.1038/s41598-019-49892-6'
  },
  {
    title: 'Whole genome sequencing reveals high complexity of copy number variation at insecticide resistance loci in malaria mosquitoes',
    authors: 'Lucas, E. R., et al. (2019)',
    content: 'The sustainability of malaria control in Africa is threatened by the rise of insecticide resistance in Anopheles mosquitoes, which transmit the disease. To gain a deeper understanding of how mosquito populations are evolving, here we sequenced the genomes of 765 specimens of Anopheles gambiae and Anopheles coluzzii sampled from 15 locations across Africa, and identified over 50 million single nucleotide polymorphisms within the accessible genome. These data revealed complex population structure and patterns of gene flow, with evidence of ancient expansions, recent bottlenecks, and local variation in effective population size.',
    doi: 'https://doi.org/10.1101/gr.245795.118'
  },
  {
    title: 'Candidate-gene based GWAS identifies reproducible DNA markers for metabolic pyrethroid resistance from standing genetic variation in East African Anopheles gambiae (in press)',
    authors: 'Weetman, D., et al. (2018)',
    content: 'Metabolic resistance to pyrethroid insecticides is widespread in Anopheles mosquitoes and is a major threat to malaria control. DNA markers would aid predictive monitoring of resistance, but few mutations have been discovered outside of insecticide-targeted genes. Isofemale family pools from a wild Ugandan Anopheles gambiae population, from an area where operational pyrethroid failure is suspected, were genotyped using a candidate-gene enriched SNP array. Resistance-associated SNPs were detected in three genes from detoxification superfamilies, in addition to the insecticide target site (the Voltage Gated Sodium Channel gene, Vgsc). The putative associations were confirmed for two of the marker SNPs, in the P450 Cyp4j5 and the esterase Coeae1d by reproducible association with pyrethroid resistance in multiple field collections from Uganda and Kenya, and together with the Vgsc-1014S (kdr) mutation these SNPs explained around 20% of variation in resistance. Moreover, the >20 Mb 2La inversion also showed evidence of association with resistance as did environmental humidity. Sequencing of Cyp4j5 and Coeae1d detected no resistance-linked loss of diversity, suggesting selection from standing variation. Our study provides novel, regionally-validated DNA assays for resistance to the most important insecticide class, and establishes both 2La karyotype variation and humidity as common factors impacting the resistance phenotype.',
    doi: 'https://doi.org/10.1038/s41598-018-21265-5'
  },
  {
    title: 'Copy number variation (CNV) and insecticide resistance in mosquitoes: evolving knowledge or an evolving problem? ',
    authors: 'Weetman, D., et al. (2018)',
    content: 'Copy number variation (CNV) in insect genomes is a rich source of potentially adaptive polymorphism which may help overcome the constraints of purifying selection on conserved genes and/or permit elevated transcription. Classic studies of amplified esterases and acetylcholinesterase duplication in Culex pipiens quantified evolutionary dynamics of CNV driven by insecticidal selection.',
    doi: 'https://doi.org/10.1016/j.cois.2018.04.005'
  },
  // GAARDian
  {
    title: 'Improved spatial ecological sampling using open data and standardization: an example from malaria mosquito surveillance',
    authors: 'Sedda et al. (2019)',
    content: 'Vector-borne disease control relies on efficient vector surveillance, mostly carried out using traps whose number and locations are often determined by expert opinion rather than a rigorous quantitative sampling design. In this work we propose a framework for ecological sampling design which in its preliminary stages can take into account environmental conditions obtained from open data (i.e. remote sensing and meteorological stations) not necessarily designed for ecological analysis. These environmental data are used to delimit the area into ecologically homogeneous strata.',
    doi: 'https://doi.org/10.1098/rsif.2018.0941'
  },
  // Linked publications
  {
    title: 'The genetic architecture of target-site resistance to pyrethroid insecticides in the African malaria vectors Anopheles gambiae and Anopheles coluzzii.',
    authors: 'Clarkson, C.,et al. (2021)',
    content: 'Resistance to pyrethroid insecticides is a major concern for malaria vector control. Pyrethroids target the voltage‐gated sodium channel (VGSC), an essential component of the mosquito nervous system.',
    doi: 'https://doi.org/10.1111/mec.15845'
  },
  {
    title: 'Genome variation and population structure among 1,142 mosquitoes of the African malaria vector species Anopheles gambiae and Anopheles coluzzii',
    authors: 'The Anopheles gambiae 1000 Genomes Consortium (2020)',
    content: 'The sustainability of malaria control in Africa is threatened by the rise of insecticide resistance in Anopheles mosquitoes, which transmit the disease. To gain a deeper understanding of how mosquito populations are evolving, here we sequenced the genomes of 765 specimens of Anopheles gambiae and Anopheles coluzzii sampled from 15 locations across Africa, and identified over 50 million single nucleotide polymorphisms within the accessible genome. These data revealed complex population structure and patterns of gene flow, with evidence of ancient expansions, recent bottlenecks, and local variation in effective population size. Strong signals of recent selection were observed in insecticide-resistance genes, with several sweeps spreading over large geographical distances and between species. The design of new tools for mosquito control using gene-drive systems will need to take account of high levels of genetic diversity in natural mosquito populations.',
    doi: 'https://doi.org/10.1101/gr.262790.120'
  },
  {
    title: 'Fine scale spatial investigation of multiple insecticide resistance and underlying target-site and metabolic mechanisms in Anopheles gambiae in central Côte',
    authors: 'Oumbouke, WA., et al. (2020)',
    content: 'Routine monitoring of occurrence, levels and mechanisms of insecticide resistance informs effective management strategies, and should be used to assess the effect of new tools on resistance.',
    doi: 'https://doi.org/10.1038/s41598-020-71933-8'
  },
  {
    title: 'Analysis-ready datasets for insecticide resistance phenotype and genotype frequency in African malaria vectors',
    authors: 'Moyes, CL., et al. (2019)',
    content: 'The impact of insecticide resistance in malaria vectors is poorly understood and quantified. Here a series of geospatial datasets for insecticide resistance in malaria vectors are provided, so that trends in resistance in time and space can be quantified, and the impact of resistance found in wild populations on malaria transmission in Africa can be assessed.',
    doi: 'https://doi.org/10.1038/s41597-019-0134-2'
  },
  {
    title: 'LLIN Evaluation in Uganda Project (LLINEUP): a cross-sectional survey of species diversity and insecticide resistance in 48 districts of Uganda',
    authors: 'Lynd , A., et al. (2019)',
    content: 'Long-lasting insecticidal nets (LLINs) are the principal tool for malaria control in Africa and are presently treated with a single class of insecticide; however, increasing levels of insecticide resistance threaten their success.',
    doi: 'https://doi.org/10.1186/s13071-019-3353-7'
  },
  {
    title: 'Insecticide resistance in Anopheles gambiae from the northern Democratic Republic of Congo, with extreme knockdown resistance (kdr) mutation frequencies revealed by a new diagnostic assay',
    authors: 'Lynd , A., et al. (2018) ',
    content: 'Mutations in the voltage-gated sodium channel at codon 1014 confer knock-down resistance (kdr) to pyrethroids in a wide range of insects. Anopheles gambiae exhibits two mutant alleles at codon 1014, serine and phenylalanine; and both are now widespread across Africa',
    doi: 'https://doi.org/10.1186/s12936-018-2561-5'
  },
  {
    title: 'Associated patterns of insecticide resistance in field populations of malaria vectors across Africa',
    authors: 'Hancock, PA., et al. (2018)',
    content: 'Malaria control programs rely on chemical insecticides to target mosquito vectors and are potentially threatened by the emergence of insecticide resistance in African vector populations',
    doi: 'https://doi.org/10.1073/pnas.1801826115'
  },
  {
    title: 'Rapid selection of a pyrethroid metabolic enzyme CYP9K1 by operational malaria control activities',
    authors: 'Vontas, J., et al. (2018)',
    content: 'Eliminating malaria from islands should, in theory, be easier than eliminating malaria from countries in mainland Africa because of restricted movement of insects and people between treated and untreated areas. The example of Bioko Island, where the entomological inoculation rate in 2004 was among the highest in Africa, demonstrates how difficult this can be. Vector control has eliminated two of the four vector species, and malaria has been dramatically reduced.',
    doi: 'https://doi.org/10.1073/pnas.1719663115'
  },
  {
    title: 'Genome-wide transcriptional analyses in Anopheles mosquitoes reveal an unexpected association between salivary gland gene expression and insecticide resistance.',
    authors: 'Isaacs, AT., et al. (2018)',
    content: 'To combat malaria transmission, the Ugandan government has embarked upon an ambitious programme of indoor residual spraying (IRS) with a carbamate class insecticide, bendiocarb',
    doi: 'https://doi.org/10.1186/s12864-018-4605-1'
  },
  {
    title: 'Genetic diversity of the African malaria vector Anopheles gambiae',
    authors: 'The Anopheles gambiae 1000 Genomes Consortium (2017)',
    content: 'The sustainability of malaria control in Africa is threatened by the rise of insecticide resistance in Anopheles mosquitoes, which transmit the disease. To gain a deeper understanding of how mosquito populations are evolving, here we sequenced the genomes of 765 specimens of Anopheles gambiae and Anopheles coluzzii sampled from 15 locations across Africa, and identified over 50 million single nucleotide polymorphisms within the accessible genome. These data revealed complex population structure and patterns of gene flow, with evidence of ancient expansions, recent bottlenecks, and local variation in effective population size. Strong signals of recent selection were observed in insecticide-resistance genes, with several sweeps spreading over large geographical distances and between species. The design of new tools for mosquito control using gene-drive systems will need to take account of high levels of genetic diversity in natural mosquito populations.',
    doi: 'https://doi.org/10.1038/nature24995'
  },
  {
    title: 'Tracing the origin of the early wet-season Anopheles coluzzii in the Sahel',
    authors: 'Lehmann , T., (2017)',
    content: 'In arid environments, the source of the malaria mosquito populations that re‐establish soon after first rains remains a puzzle and alternative explanations have been proposed. Using genetic data, we evaluated whether the early rainy season (RS) population of Anopheles coluzzii is descended from the preceding late RS generation at the same locality, consistent with dry season (DS) dormancy (aestivation), or from migrants from distant locations.',
    doi: 'https://doi.org/10.1111/eva.12486'
  },
  {
    title: 'Tracing the origin of the early wet-season Anopheles coluzzii in the Sahel',
    authors: 'Lehmann , T., (2017)',
    content: 'In arid environments, the source of the malaria mosquito populations that re‐establish soon after first rains remains a puzzle and alternative explanations have been proposed. Using genetic data, we evaluated whether the early rainy season (RS) population of Anopheles coluzzii is descended from the preceding late RS generation at the same locality, consistent with dry season (DS) dormancy (aestivation), or from migrants from distant locations.',
    doi: 'https://doi.org/10.1111/eva.12486'
  },
  {
    title: 'Tracing the origin of the early wet-season Anopheles coluzzii in the Sahel',
    authors: 'Lehmann , T., (2017)',
    content: 'In arid environments, the source of the malaria mosquito populations that re‐establish soon after first rains remains a puzzle and alternative explanations have been proposed. Using genetic data, we evaluated whether the early rainy season (RS) population of Anopheles coluzzii is descended from the preceding late RS generation at the same locality, consistent with dry season (DS) dormancy (aestivation), or from migrants from distant locations.',
    doi: 'https://doi.org/10.1111/eva.12486'
  }
]

import { openURL } from 'quasar'

export default {
  name: 'Publications',
  data () {
    return {
      publications,
      slide: '0'
    }
  },
  computed: {
    placeholders () {
      if (publications.length % 4 === 0) {
        return 0
      }
      return 4 - (publications.length % 4)
    },
    pubCarousels () {
      return this.getCarousel(4)
    },
    pubCarousels2 () {
      return this.getCarousel(3)
    },
    pubCarousels3 () {
      return this.getCarousel(2)
    },
    pubCarousels4 () {
      return this.getCarousel(1)
    }
  },
  methods: {
    openURL,
    getCarousel (percentage) {
      const aux = []
      for (let pub = 0; pub < this.publications.length; pub++) {
        if (pub % percentage === 0 && !(aux.filter(e => e.name === pub.toString()).length > 0)) {
          aux.push({ name: pub.toString(), publications: [] })
        }
        aux[aux.length - 1].publications.push(this.publications[pub])
      }
      return aux
    }
  },
  beforeMount () {
    for (const pub in this.publications) {
      this.publications[pub].id = parseInt(pub) + 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-bg{
    background-color: rgba(0, 0, 0, 0.3);
  }
  .my-title{
    font-weight: 600;
  }
  .my-card{
    background-color: rgba(255, 255, 255, 0.9);
  }
  .my-info{
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
