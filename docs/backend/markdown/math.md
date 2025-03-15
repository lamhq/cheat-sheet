# Math

Writting mathematical expressions.

## Overview

To write mathematical expressions in Markdown, you can use LaTeX syntax for rendering them. It's also supported by GitHub.


## Inline expressions

You can surround the expression with dollar symbols (`$`)

```md
$\sqrt{3x-1}+(1+x)^2$
```

$\sqrt{3x-1}+(1+x)^2$


## Block expressions

Start a new line and delimit the expression with two dollar symbols `$$`.

```md
**The Cauchy-Schwarz Inequality**

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

Or use `math` code block syntax:

````md
**The Cauchy-Schwarz Inequality**

```math
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
```
````

**The Cauchy-Schwarz Inequality**

```math
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
```


## Complex formulas

If your document requires only a few simple mathematical formulas, plain LaTeX has most of the tools that you will ever need.

There're also packages that contains numerous complex formulas:
- `amsmath`: introduces several new commands that are more powerful and flexible 
- `mathtools`: fixes some `amsmath` quirks and adds some useful settings, symbols, and environments to amsmath

To use either package, include:
```md
\usepackage{amsmath}
```

or:

```md
\usepackage{amsmath}
```


## Greek letters

```md
\alpha, \Alpha, \beta, \Beta, \gamma, \Gamma, \pi, \Pi, \phi, \varphi, \mu, \Phi
```

```math
\alpha, \Alpha, \beta, \Beta, \gamma, \Gamma, \pi, \Pi, \phi, \varphi, \mu, \Phi
```


## Operators

| Symbol | Code |
|---|---|
| $+$ | `+` |
| $-$ | `-` |
| $\cdot$ | `\cdot` |
| $\times$ | `\times` |
| $*$ | `*` |
| $\div$ | `\div` |
| $\bmod$ | `\bmod` |
| $\equiv$ | `\equiv` |
| $\leq$ | `\leq` |
| $\geq$ | `\geq` |
| $\approx$ | `\approx` |
| $\text{abcd}$ | `\text{abcd}` |
| $\forall$ | `\forall` |
| $\in$ | `\in` |


## Spacing

Increase distance between inline expressions:

```latex
a \quad b
```

You can also use:
- `\,` for a small space
- `\:` for a medium space
- `\;` for a larger space
- `\qquad` for even more space than `\quad` (double the width of `\quad`)

```math
\forall x \in X, \quad \exists y \leq \epsilon
```


## Text

Inserting text in math expression
```md
50 \text{ apples} \times 100 \text{ apples} 
 = \text{ lots of apples}^2
```

```math
50 \text{ apples} \times 100 \text{ apples} 
 = \text{ lots of apples}^2
```

You cal also use:
- **`\textrm{}`**: Renders the text in a roman (serif) font  
- **`\textit{}`**: Italicizes text
- **`\textbf{}`**: Bolds text


## Powers and indices

```md
n^{1.2}
```

```math
n^{1.2}
```

## Indices

```md
k_{n+1}
```
```math
k_{n+1}
```

## Fractions

```md
\frac{numerator}{denominator}
```

```math
\frac{1}{2}
```

```md
\frac{\frac{1}{x}+\frac{1}{y}}{y-z}
```

```math
\frac{\frac{1}{x}+\frac{1}{y}}{y-z}
```


## Roots

```md
\sqrt{x}, \sqrt[n]{x}
```

```math
\sqrt{x}, \quad \sqrt[n]{x}
```


## Sums

```md
\sum_{i=1}^{10} t_i
```

```math
\sum_{i=1}^{10} t_i
```


## Integrals

```md
\int_0^\infty \mathrm{e}^{-x}\,\mathrm{d}x
```

```math
\int_0^\infty \mathrm{e}^{-x}\,\mathrm{d}x
```


## Combination & permutation

| Symbol | Description |
|---|---|
| $n!$ | factorial |
| $P_k^n = \frac{n!}{(n-k)!}$ | permutation |
| $C_k^n = \binom{n}{k} = \frac{n!}{k!(n-k)!}$ | combination |

```math
\frac{n!}{k!(n-k)!} = \binom{n}{k}
```

## Probability

| Symbol | Description |
|---|---|
| $P(A)$ | probability of event A |
| $P(A \cap B)$ | probability of events intersection |
| $P(A \cup B)$ | probability of events union |
| $P(A \mid B)$ | conditional probability function |
| $f(x)$ | probability density function (pdf) |
| $F(x)$ | cumulative distribution function (cdf) |
| $E(X)$ | expectation value |
| $\mu$ | mean |
| $var(X) = \sigma^2$ | variance |
| $\sigma$ | standard deviation |
| $N(\mu, \sigma^2)$ | normal distribution |


## Set theory

| Symbol | Description |
|---|---|
| $A \subset B$ | subset |
| $A \subseteq B$ | subset equal |
| $A \cap B$ | intersection |


## Reference

- [LaTeX/Mathematics](https://en.wikibooks.org/wiki/LaTeX/Mathematics)