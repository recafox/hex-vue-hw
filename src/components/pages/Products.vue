<template>

  <div class="container-fluid">
    <!-- vue-loading-overlay -->
        <loading :active.sync="isLoading" ></loading>
        
    <div class="text-right">
      <button class="btn btn-outline-primary mt-4" @click.prevent="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="80">原價</th>
        <th width="80">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
        <th width="120">刪除</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td>
            <span v-if="item.is_enabled==1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary" @click="openModal(false, item)">編輯</button>
          </td>
          <td>
            <button class="btn btn-outline-danger" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :compo-pages='pagination' @turn='getProducts'></Pagination>
    <!-- bootstrap pagination -->
    <!-- <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':!pagination.has_pre}">
      <a class="page-link" href="#" @click.prevent="getProducts
    (pagination.current_page-1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for='page in pagination.total_pages' :key="page" :class="{'active':pagination.current_page === page}"><a class="page-link" href="#" @click.prevent="getProducts
    (page)">{{page}}</a></li>

    <li class="page-item">
      <a class="page-link" href="#" :class="{'disabled':!pagination.has_next}"   @click.prevent="getProducts
    (pagination.current_page+1)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav> -->
    <!-- Bootstrap edit Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <!-- 關閉按鈕 -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                     <i class="fas fa-spinner fa-spin" v-if='status.fileUploading'></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change='uploadFile' />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <!-- 由1和0控制狀態, 當1時為true-value, 0則相反 -->
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">警告</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">真的要刪除商品：{{tempProduct.title}}嗎？</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">不刪除</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct()">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
因為這個元件內並不認得jquery語法(使用$指定), 所以要import
*/
import $ from "jquery";
import Pagination from '../Pagination'

export default {
  data() {
    return {
      //遠端街的資料
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading:false,
      status:{
        fileUploading:false,
      },
      pagination:{

      }
    };
  },
  components:{
    'Pagination': Pagination,
  },
  methods: {  //預設參數
    getProducts(page = 1) {
      //使用全域環境變量的方式加載API, 之後若要修改則修改.env檔
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      //axios取得遠端資料方法
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;

      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    openDelModal(item) {
       this.tempProduct = Object.assign({}, item);
      $("#deleteModal").modal("show");
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          //若是成功新增, 就關掉modal (bs方法),並且重新取得遠端資料以更新畫面
          $("#deleteModal").modal("hide");
          vm.getProducts();
        } else {
          $("#deleteModal").modal("hide");
          vm.getProducts();
          console.log("刪除失敗");
        }
      });
    },
    //新增產品(運用API, POST方法)
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      //文件中要求的資料結構是{'data': 新增產品}
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        console.log(httpMethod);
        if (response.data.success) {
          //若是成功新增, 就關掉modal (bs方法),並且重新取得遠端資料以更新畫面
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    uploadFile(){
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers:{
          'Content-type':'multipart/form-data'
        }
      }).then((response)=>{
        vm.status.fileUploading = false;
        console.log(response.data);
        if(response.data.success){
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          vm.$set(vm.tempProduct, 'imageUrl',response.data.imageUrl)
        }else{
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      })
    }
  },
  created() {
    this.getProducts();
    
  },
}
</script>