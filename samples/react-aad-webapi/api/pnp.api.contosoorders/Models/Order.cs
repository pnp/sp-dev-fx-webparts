using System;

namespace pnp.api.contosoorders.Models {
    public class Order {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public Region Region { get; set; }
        public string Rep { get; set; }
        public string Item { get; set; }
        public uint Units { get; set; }
        public double UnitCost { get; set; }
        public double Total { get; set; }
    }

    public enum Region {
        East,
        Central,
        West
    }
}
