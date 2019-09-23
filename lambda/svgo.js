'use strict';
import querystring from "querystring";

exports.handler = async (event, context) => {
  var SVGO = require('svgo'),
  svgo = new SVGO({
    plugins: [
      {
        cleanupAttrs: true
      },
      {
        removeDoctype: true
      },
      {
        removeXMLProcInst: true
      },
      {
        removeComments: true
      },
      {
        removeMetadata: true
      },
      {
        removeTitle: true
      },
      {
        removeDesc: true
      },
      {
        removeUselessDefs: true
      },
      {
        removeEditorsNSData: true
      },
      {
        removeEmptyAttrs: true
      },
      {
        removeHiddenElems: true
      },
      {
        removeEmptyText: true
      },
      {
        removeEmptyContainers: true
      },
      {
        removeViewBox: false
      },
      {
        cleanupEnableBackground: true
      },
      {
        convertStyleToAttrs: true
      },
      {
        convertColors: true
      },
      {
        convertPathData: true
      },
      {
        convertTransform: true
      },
      {
        removeUnknownsAndDefaults: true
      },
      {
        removeNonInheritableGroupAttrs: true
      },
      {
        removeUselessStrokeAndFill: true
      },
      {
        removeUnusedNS: true
      },
      {
        cleanupIDs: true
      },
      {
        cleanupNumericValues: true
      },
      {
        moveElemsAttrsToGroup: true
      },
      {
        moveGroupAttrsToElems: true
      },
      {
        collapseGroups: true
      },
      {
        removeRasterImages: false
      },
      {
        mergePaths: true
      },
      {
        convertShapeToPath: true
      },
      {
        sortAttrs: true
      },
      {
        removeDimensions: true
      },
      {
        removeAttrs: { attrs: "(stroke|fill)" }
      }
    ]
    });

  try {
    const svgData = `
      <svg>
        <line
          stroke= "#bada55"
          stroke-width= "2"
          stroke-linecap= "round"
          x1= "70"
          y1= "80"
          x2= "250"
          y2= "150">
        </line>
      </svg>
    `;
    const optimizedObject = await svgo.optimize(svgData);
    return {
      statusCode: 200,
      body: optimizedObject.data
    }
  } catch (e) {
    throw e;
  }
};
