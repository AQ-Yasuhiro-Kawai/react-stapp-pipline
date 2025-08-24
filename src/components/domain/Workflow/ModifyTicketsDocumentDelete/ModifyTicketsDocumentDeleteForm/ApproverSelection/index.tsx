import {
  ArrowLeft,
  ArrowRight,
  MoveDown,
  Pencil,
  TicketCheck,
} from "lucide-react";
import React from "react";
import { Button, VARIANT } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/Title";
import { ApproveStep } from "./ApproveStep";

export type Approver = {
  userId: string;
  name: string;
  userPrincipalName: string;
  organizationName: string;
  positionName: string;
  approved: boolean;
  isRetired: boolean;
};

export type ApprovalGroup = {
  groupId: string; // 表示用の識別子を追加
  approvedNum: number;
  requiredApprovalCount: number;
  approvers: Approver[];
};

export type ApprovalStep = {
  stepNumber: number;
  approvalGroups: ApprovalGroup[];
};

type Props = {
  onBack: () => void;
  onNext: () => void;
};

const approvals: ApprovalStep[] = [
  {
    stepNumber: 1,
    approvalGroups: [
      {
        groupId: "1",
        requiredApprovalCount: 2,
        approvedNum: 0,
        approvers: [
          {
            userId: "1",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "2",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "3",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
        ],
      },
      {
        groupId: "2",
        requiredApprovalCount: 1,
        approvedNum: 0,
        approvers: [
          {
            userId: "1",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
        ],
      },
      {
        groupId: "3",
        requiredApprovalCount: 2,
        approvedNum: 1,
        approvers: [
          {
            userId: "1",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "2",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "3",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "4",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
        ],
      },
    ],
  },
  {
    stepNumber: 2,
    approvalGroups: [
      {
        groupId: "1",
        requiredApprovalCount: 2,
        approvedNum: 2,
        approvers: [
          {
            userId: "1",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "2",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
          {
            userId: "3",
            name: "田中太郎",
            userPrincipalName: "string",
            organizationName: "〇〇部",
            positionName: "部長",
            approved: false,
            isRetired: false,
          },
        ],
      },
    ],
  },
];

export const ApproverSelection = ({ onBack, onNext }: Props) => {
  return (
    <>
      <div className="mt-10">
        <SectionTitle>承認フロー</SectionTitle>
        <div>
          <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
            <Pencil className="size-6" />
            <span className="font-bold">申請</span>
          </div>
          <div className="flex items-center my-2">
            <div className="ml-2.5">
              <MoveDown className="size-9" />
            </div>
          </div>
          {approvals.map((approval) => (
            <React.Fragment key={approval.stepNumber}>
              <ApproveStep approval={approval} />
              <div className="flex items-center my-2">
                <div className="ml-2.5">
                  <MoveDown className="size-9" />
                </div>
              </div>
            </React.Fragment>
          ))}
          <div className="w-full flex items-center gap-x-2 bg-main-blue/20 rounded-[10px] p-4">
            <TicketCheck className="size-6" />
            <span className="font-bold">完了</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 mb-10">
        <Button
          onClick={onBack}
          prefixElement={<ArrowLeft />}
          variant={VARIANT.OUTLINED}
        >
          戻る
        </Button>
        <Button
          onClick={onNext}
          suffixElement={<ArrowRight />}
          variant={VARIANT.PRIMARY}
        >
          次へ
        </Button>
      </div>
    </>
  );
};
