export default {
  name: 'Default Session',
  view:
{
  id: 'linearGenomeView',
  type: 'LinearGenomeView',
  offsetPx: 807898144,
  bpPerPx: 0.060204695966285374,
  displayedRegions: [
    {
      refName: '1',
      start: 0,
      end: 248956422,
      reversed: false,
      assemblyName: 'A.gambiae'
    }
  ],
  tracks: [
    {
      id: '06EzDAqMB',
      type: 'ReferenceSequenceTrack',
      height: 100,
      configuration: 'GRCh38-ReferenceSequenceTrack'
    },
    {
      id: 'GsjcSS2Rk',
      type: 'BasicTrack',
      height: 100,
      configuration: 'GCA_000001405.15_GRCh38_full_analysis_set.refseq_annotation.sorted.gff'
    },
    {
      id: 'UDpqYoZxIw',
      type: 'AlignmentsTrack',
      height: 250,
      configuration: 'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome',
      PileupTrack: {
        id: '8uaVGCeEym',
        type: 'PileupTrack',
        height: 100,
        configuration: {
          type: 'PileupTrack',
          trackId: 'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome_pileup_xyz',
          name: 'NA12878 Exome pileup',
          assemblyNames: [
            'A.gambiae'
          ],
          category: [
            '1000 Genomes',
            'Alignments'
          ],
          adapter: {
            type: 'CramAdapter',
            cramLocation: {
              uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/alignments/NA12878/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram'
            },
            craiLocation: {
              uri: '/jbrowse/documents/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram.crai'
            },
            sequenceAdapter: {
              type: 'BgzipFastaAdapter',
              fastaLocation: {
                uri: '/jbrowse/documents/Homo_sapiens.GRCh38.dna.toplevel.fa.gz'
              },
              faiLocation: {
                uri: '/jbrowse/documents/Homo_sapiens.GRCh38.dna.toplevel.fa.gz.fai'
              },
              gziLocation: {
                uri: '/jbrowse/documents/Homo_sapiens.GRCh38.dna.toplevel.fa.gz.gzi'
              }
            }
          },
          renderers: {
            PileupRenderer: {
              type: 'PileupRenderer'
            },
            SvgFeatureRenderer: {
              type: 'SvgFeatureRenderer'
            }
          }
        }
      },
      SNPCoverageTrack: {
        id: 'H2tlRHb8dt',
        type: 'SNPCoverageTrack',
        height: 40,
        configuration: {
          type: 'SNPCoverageTrack',
          trackId: 'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome_snpcoverage_xyz',
          name: 'NA12878 Exome snpcoverage',
          assemblyNames: [
            'A.gambiae'
          ],
          category: [
            '1000 Genomes',
            'Alignments'
          ],
          adapter: {
            type: 'SNPCoverageAdapter',
            subadapter: {
              type: 'CramAdapter',
              cramLocation: {
                uri: 'https://s3.amazonaws.com/jbrowse.org/genomes/GRCh38/alignments/NA12878/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram'
              },
              craiLocation: {
                uri: '/jbrowse/documents/NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome.cram.crai'
              },
              sequenceAdapter: {
                type: 'BgzipFastaAdapter',
                fastaLocation: {
                  uri: '/jbrowse/documents/Homo_sapiens.GRCh38.dna.toplevel.fa.gz'
                },
                faiLocation: {
                  uri: '/jbrowse/documents/Homo_sapiens.GRCh38.dna.toplevel.fa.gz.fai'
                },
                gziLocation: {
                  uri: '/jbrowse/documents/Homo_sapiens.GRCh38.dna.toplevel.fa.gz.gzi'
                }
              }
            }
          },
          renderers: {
            SNPCoverageRenderer: {
              type: 'SNPCoverageRenderer'
            }
          }
        },
        selectedRendering: ''
      },
      showCoverage: true,
      showPileup: true
    },
    {
      id: '_2HfQwh57',
      type: 'VariantTrack',
      height: 100,
      configuration: 'ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf'
    }
  ],
  hideHeader: false,
  hideHeaderOverview: false,
  trackSelectorType: 'hierarchical',
  showTrackLabels: true,
  showCenterLine: false

}
}
