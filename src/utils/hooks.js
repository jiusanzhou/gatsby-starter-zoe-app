// this is a tick way to trigger HMR
import zoefile from "../../zoe-site.yaml"
import { buildZoefile } from './zoefile-parser'

var zoe = null;

const useSiteMetadata = () => {
  // site.siteMetadata._raw = zoefile
  if (!zoe) zoe = buildZoefile(zoefile)

  return zoe.siteMetadata
}

export const useAssets = () => {
  
}

export { useSiteMetadata }