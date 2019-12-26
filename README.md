# lines_to_matrix

## 概要

各行から行と列の集合と対応する値を抽出して、行列状に出力します。

入力例

```
2019年12月20日,ユーザA,3
2019年12月20日,ユーザB,9
2019年12月20日,ユーザC,4
2019年12月21日,ユーザA,3
2019年12月21日,ユーザC,7
2019年12月22日,ユーザB,6
```

出力例

```
,ユーザA,ユーザB,ユーザC
2019年12月20日,3,9,4
2019年12月21日,3,,7
2019年12月22日,,6,
```

|                | ユーザA | ユーザB | ユーザC |
|----------------|---------|---------|---------|
| 2019年12月20日 | 3       | 9       | 4       |
| 2019年12月21日 | 3       |         | 7       |
| 2019年12月22日 |         | 6       |         |


## Setup

（書く）

## Usages

（TODO：オプション指定はこれから実装する。）

### ファイルからCSVを読み込む

```
l2m lines.csv > matrix.csv
```

### 標準入力からCSVを読み込む

```
cat lines.csv | l2m > matrix.csv
```

### 列情報の指定

1列目を縦軸に、2列目を横軸に、4列目を値に指定したい場合：

```
l2m -y 1 -x 2 -v 4 sample.csv
```

### 並び替え

縦軸は降順に、横軸は昇順に並び替える場合：

```
l2m --y-order desc --x-order asc sample.csv
```

省略形式：

```
l2m -yo desc -xo asc sample.csv
```

### N/A値の扱い

該当値の存在しない箇所を特定の文字列（例： `NA` ）にしたい場合：

```
l2m --na-as NA sample.csv
```

## 開発

### ビルド
```
npx tsc
```

### テスト
```
npm run test
```

### lint

```
npm run lint
```
