# The Race Track Economy

A recreation of the Krugman simulation.

## The Model 
Paul Krugman, the 2008 winner of the Nobel Prize in Economics, 
conducted a simulation using a spatial economics model called 
the "Racetrack Economy" model (Krugman). 
This model hypothesizes several locations (in Krugman's case, 12 cities) arranged 
at equal intervals in a circular fashion, like the numbers on a clock face. 
The economy includes farmers, who live in the locations and do not move, 
and factory workers, who move between the locations in search of higher wages and 
lower prices. Initially, the populations of the locations are only slightly different
(a uniformly equal location size causes equilibrium, which prevents the simulation 
from working). Using these basic conditions, Krugman modified transportation 
cost (T) and the degree of love of variety for industrial products (σ) in order to
analyze changes in the numbers and locations of agglomerations.

## Variables

- K: The number of locations assumed to be laid out symmetrically in a circle, with transportation
                possible only around the circumference. The distance between any two neighboring locations is set equal
                to one.
- π: The share of manufacturing goods in expenditure.
- T: The level of transportation cost among locations. A value of 1 represents no transportation cost,
                while a value of 10 represents significant transportation cost.
- σ: The elasticity of substitution among manufactured goods. A value of 1 represents a strong love of
                variety, while a value of 20 represents a limited love of variety.

Variables "π", "T" and "σ" can be changed while the simulation is in progress.
This allows the observation of agglomeration formation, agglomeration dispersal, and changes in the numbers and locations of agglomerations according to various parameters.

## Simulator


- The x-axis corresponds to locations. As Krugman's simulation is configured circumferentially,
  the locations on the far left and right should be considered to be connected.
- The y-axis shows the industrial production share of each location in the simulation world. A location with a high y-axis value has "agglomeration" of industrial production.

- The "Start" button starts and "Stop" button stops the simulation.
- The "Reset" button resets the simulation.

## Building your own bundle

  yarn install && yarn build


## References
* Krugman, P. (1993) On the number and location of cities. <i>European Economic Review</i>, Vol. 37 (2-3)
pp.293-298.
* Fujita, M., Krugman, P., Venables, A. (1999) "The Spatial Economy: Cities, Regions, and International
Trade", MIT Press._

