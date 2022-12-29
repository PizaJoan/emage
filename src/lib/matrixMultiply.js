const lastRow = [0, 0, 0, 0, 1]


export function multiplyMatrices(matrices) {

    if (matrices.length >= 2) {

        const firstMatrix = matrices.splice(0, 1)[0];
        const secondMatrix = matrices.splice(0, 1)[0];

        firstMatrix.push(lastRow);
        secondMatrix.push(lastRow);

        let res = multiply(firstMatrix, secondMatrix);

        for (const matrix of matrices) {

            matrix.push(lastRow);

            res = multiply(res, matrix);
        }

        res.pop();
        return res;

    } else {

        return matrices[0];
    }
}

function multiply(matA, matB) {

    const res = new Array(matA.length).fill(0).map(row => (new Array(matB[0].length).fill(0)));

    return res.map((row, i) => 
        row.map((val, j) => 
            matA[i].reduce((sum, elem, k) => sum + elem * matB[k][j], 0)
        )
    )
}
