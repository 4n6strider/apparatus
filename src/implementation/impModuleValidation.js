'use scrict'

const impMetamodel = require('./impSchema.js')
// checks if the instance is correct

// valid component connections
const deviceArray = impMetamodel.deviceArray
const networkArray = impMetamodel.networkArray
const micronetArray = impMetamodel.micronetArray
const netArray = impMetamodel.netArray
const undentifiedNodeArray = impMetamodel.undentifiedNodeArray
const dataArray = impMetamodel.dataArray
const actorArray = impMetamodel.actorArray
const maliciousActorArray = impMetamodel.maliciousActorArray
const assetArray = impMetamodel.assetArray
const constraintArray = impMetamodel.constraintArray
const mechanismArray = impMetamodel.mechanismArray
const threatArray = impMetamodel.threatArray
const vulnerabilityArray = impMetamodel.vulnerabilityArray

// decleration of arrays
let result = '' // posted on the nodeInfo div
let arrWrong = [] // stores wrong connection of nodes

module.exports = function moduleValidation (cy) {
  componentValidation(cy, 'device', deviceArray)
  componentValidation(cy, 'network connection', networkArray)
  componentValidation(cy, 'micronet', micronetArray)
  componentValidation(cy, 'net', netArray)
  componentValidation(cy, 'unidentified node', undentifiedNodeArray)
  componentValidation(cy, 'data', dataArray)
  componentValidation(cy, 'actor', actorArray)
  componentValidation(cy, 'malicious actor', maliciousActorArray)
  componentValidation(cy, 'asset', assetArray)
  componentValidation(cy, 'constraint', constraintArray)
  componentValidation(cy, 'mechanism', mechanismArray)
  componentValidation(cy, 'threat', threatArray)
  componentValidation(cy, 'vulnerability', vulnerabilityArray)
}

function componentValidation (cy, component, componentArray) {
  cy.nodes().map((node) => {
    // checks if node is the desired component
    if (node.data().info.concept === component) {
      // stores the neighboring nodes of the component
      const neighborNodes = node.neighborhood().add(node)
      const neigborObject = neighborNodes.data().info.concept
      Object.keys(neigborObject).map((i) => {
        // every neighbor node is added to the array arrWrong
        arrWrong.push(neigborObject)
        // if the neighbor is a valid connection it is removed from the array
        if (componentArray.indexOf(neigborObject) !== -1) {
          arrWrong.pop(neigborObject)
        }
        result = `${arrWrong}`
        // if the array is empty, the module is correct
        if (result === '') {
          result = 'model instant is valid 👍'
        }
      })
    }
  })
  document.getElementById('info-for-nodes-id').textContent = result
}
