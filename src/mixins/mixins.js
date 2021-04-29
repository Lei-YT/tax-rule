
import Util from "../libs/utils"

export const GetHeight = {
    data() {
        return {
            divHeight: 100,
        }
    },
    computed: {
    },
    mounted() {
        var _this = this;
        _this.divHeight = _this.getHeight()

        //窗口改变时执行
        window.addEventListener('resize', _.debounce(function () {
            _this.divHeight = _this.getHeight()
        }, 150), false)

    },
    methods: {
        getHeight() {
            var _this = this;
            var clientHeight = document.documentElement.clientHeight - 85
            var topHeight = _this.$refs.top ? _this.$refs.top.clientHeight : 0
            var footerHeight = _this.$refs.footer ? _this.$refs.footer.clientHeight : 0
            var mainHeight = clientHeight - topHeight - footerHeight;
            // console.log(mainHeight ,'--', topHeight ,'--', footerHeight)
            return mainHeight
        }
    }
}


export const side = {

    computed: {
        side() {
            return this.$store.state.side
        },
        breadcrumb() {
            // console.log(Util.getBreadcrumb(this.$store.state.menuList, this.$route.name, []))
            return Util.getBreadcrumb(this.$store.state.menuList, this.$route.name, []);
        },
        openMenus() {
            var openMenus = [];
            _.each(this.breadcrumb, function (v) {
                openMenus.push(v.name);
            });
            // _.remove(openMenus, function(v,i) {
            //     return i>1
            //   });
            //   console.log(openMenus) 
            return openMenus
        },
        activeName(){
            if(this.openMenus.length>=2){
                return this.openMenus[1]
            }else{
                return this.openMenus[0]
            }
        }
    },

}


export const page = {
    data() {
        return {
            size: 20,
            page: 1,
            total: 10,
            pageSizeOpts: [20, 40, 60, 100, 200],
            tableLoading: false,
            tableIds:[],
            tableSelection:[]
        }
    },

    mounted() {
        var _this = this;
        var page = _this.$route.query.page
        if (page) {
            _this.page = Number(page)
        }
        // this.getData();
    },
    methods: {
        changePage(page) {
            var _this = this;
            _this.page = page
            // _this.$router.push({ query: { page: page } });
            _this.getData()
        },
        changeSize(size) {
            var _this = this;
            _this.size = size
            _this.page = 1
            _this.getData()
        },
        getTableIds(arr){
            var _this = this;
            _this.tableIds = []
            _this.tableSelection = arr
            _.each(arr,function(v){
                _this.tableIds.push(v.id)
            })
            // console.log(_this.tableIds,_this.tableSelection)
        }
    }
}


// export default Mixin;