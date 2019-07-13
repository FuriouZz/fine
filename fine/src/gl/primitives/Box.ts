// function () {
//   let i = 0
//   for (let vd = 0; vd <= depth_segment; vd++) {
//     for (let vh = 0; vh <= height_segment; vh++) {
//       for (let vw = 0; vw <= width_segment; vw++) {

//         const z = (vd / depth_segment) * 2 - 1
//         const x = (vw / width_segment) * 2 - 1
//         const y = (vh / height_segment) * 2 - 1

//         vertices[i * vertex_size + 0] = x
//         vertices[i * vertex_size + 1] = y
//         vertices[i * vertex_size + 2] = z

//         console.log(i / vertex_size, x, y, z);

//         i += vertex_size
//       }
//     }
//   }
// }

export function box(width_segment = 1, height_segment = 1, depth_segment = 1) {
  const vertex_size = 3
  const vertices = new Float32Array((width_segment + 1) * (height_segment + 1) * (depth_segment + 1) * vertex_size)
  const indices = new Uint16Array(1000)

  const sides = [
    [ width_segment, height_segment ],
    [ depth_segment, height_segment ],
    [ width_segment, depth_segment  ],
  ]

  let i = 0
  for (let vd = 0; vd <= depth_segment; vd++) {
    for (let vh = 0; vh <= height_segment; vh++) {
      for (let vw = 0; vw <= width_segment; vw++) {

        const z = (vd / depth_segment) * 2 - 1
        const x = (vw / width_segment) * 2 - 1
        const y = (vh / height_segment) * 2 - 1

        vertices[i * vertex_size + 0] = x
        vertices[i * vertex_size + 1] = y
        vertices[i * vertex_size + 2] = z

        console.log(i / vertex_size, x, y, z);

        i += vertex_size
      }
    }
  }

  // console.log('-----');

  // const sides = [
  //   [  ]
  // ]


  // for (let ih = 0; ih < height_segment; ih++) {
  //   for (let iw = 0; iw < width_segment; iw++) {

  //     console.log(
  //       (ih * (width_segment+1)) + (iw),
  //       (ih * (width_segment+1)) + (iw + 1),
  //       (ih * (width_segment+1)) + (iw + (width_segment+1)),
  //       (ih * (width_segment+1)) + (iw + 1),
  //       (ih * (width_segment+1)) + (iw + (width_segment+1)),
  //       (ih * (width_segment+1)) + (iw + 1 + (width_segment+1)),
  //     );

  //   }
  // }

  // let j = 0
  // for (let id = 0; id < depth_segment; id++) {
  //   for (let ih = 0; ih < height_segment; ih++) {
  //     for (let iw = 0; iw < width_segment; iw++) {

  //       indices[j*6+0] = id + ih + iw
  //       indices[j*6+1] = id + ih + iw+1
  //       indices[j*6+2] = id + ih + iw+height_segment

  //       indices[j*6+3] = id + ih + iw+1
  //       indices[j*6+4] = id + ih + iw+height_segment
  //       indices[j*6+5] = id + ih + iw+height_segment+1

  //       console.log(

  //       );

  //       j+=6
  //     }
  //   }
  // }

  console.log(i, vertices, vertices.length);

  // vertices[0] = -1
  // vertices[1] = -1
  // vertices[2] = -1

  // vertices[3] = -1
  // vertices[4] = 1
  // vertices[5] = -1

  // vertices[6] = 1
  // vertices[7] = 1
  // vertices[8] = -1

  // vertices[9] = 1
  // vertices[10] = -1
  // vertices[11] = -1
}

export class Box {

}